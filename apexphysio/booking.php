<?php
/**
 * Apex Physio & Wellness: appointment request handler for WHC (cPanel, PHP 8).
 *
 * Every valid request is:
 *   1. appended to a CSV file stored OUTSIDE public_html (so no lead is lost if email fails), and
 *   2. emailed to the clinic inbox.
 *
 * Before launch: set 'to' to the clinic's real inbox.
 */
declare(strict_types=1);

$CONFIG = [
    'to'         => 'hello@apexphysio.ca',                           // TODO: real clinic inbox
    'from'       => 'no-reply@' . preg_replace('/^www\./', '', strtolower($_SERVER['HTTP_HOST'] ?? 'apexphysio.ca')),
    'log_file'   => dirname(__DIR__) . '/booking-requests.csv',       // one level above public_html
    'rate_limit' => 5,                                                // max requests per IP ...
    'rate_window'=> 600,                                              // ... per 10 minutes
];

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, int $status = 200, array $extra = []): void {
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        echo json_encode(['ok' => $ok] + $extra);
    } else {
        // No-JavaScript fallback: send the visitor back to the form with a status flag.
        header('Location: ./?sent=' . ($ok ? '1' : '0') . '#book', true, 303);
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, ['error' => 'method']);
}

// Honeypot: bots fill the hidden field. Pretend success, store nothing.
if (!empty($_POST['bot-field'])) {
    respond(true);
}

function field(string $key, int $max, bool $multiline = false): string {
    $v = (string)($_POST[$key] ?? '');
    $v = str_replace(["\0", "\r"], '', $v);
    if (!$multiline) {
        $v = str_replace("\n", ' ', $v);   // also blocks email header injection
    }
    return mb_substr(trim($v), 0, $max);
}

$data = [
    'name'    => field('name', 100),
    'phone'   => field('phone', 40),
    'email'   => field('email', 150),
    'service' => field('service', 100),
    'area'    => field('area', 40),
    'message' => field('message', 2000, true),
];

$invalid = [];
if ($data['name'] === '')                                  $invalid[] = 'name';
if (!preg_match('/^[0-9+().\-\s]{7,40}$/', $data['phone'])) $invalid[] = 'phone';
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL))      $invalid[] = 'email';
if ($invalid) {
    respond(false, 422, ['error' => 'invalid', 'fields' => $invalid]);
}

// Simple per-IP rate limit, stored in the system temp folder.
$ip      = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile  = sys_get_temp_dir() . '/apex-booking-' . hash('sha256', $ip);
$now     = time();
$recent  = array_filter(
    array_map('intval', @file($rlFile, FILE_IGNORE_NEW_LINES) ?: []),
    fn($t) => $t > $now - $CONFIG['rate_window']
);
if (count($recent) >= $CONFIG['rate_limit']) {
    respond(false, 429, ['error' => 'rate']);
}
$recent[] = $now;
@file_put_contents($rlFile, implode("\n", $recent), LOCK_EX);

// 1) Save to CSV outside the web root. Neutralise spreadsheet formulas.
$safe = fn(string $v) => preg_match('/^[=+\-@\t]/', $v) ? "'" . $v : $v;
$saved = false;
$isNew = !file_exists($CONFIG['log_file']);
if ($fh = @fopen($CONFIG['log_file'], 'ab')) {
    if (flock($fh, LOCK_EX)) {
        if ($isNew) {
            fputcsv($fh, ['received', 'name', 'phone', 'email', 'service', 'pain_map_area', 'message'], ',', '"', '');
        }
        $saved = fputcsv($fh, array_map($safe, [
            date('c'), $data['name'], $data['phone'], $data['email'], $data['service'], $data['area'], $data['message'],
        ]), ',', '"', '') !== false;
        flock($fh, LOCK_UN);
    }
    fclose($fh);
    @chmod($CONFIG['log_file'], 0600);
}

// 2) Email the clinic.
$lines = [
    'New appointment request from the website',
    '',
    'Name:     ' . $data['name'],
    'Phone:    ' . $data['phone'],
    'Email:    ' . $data['email'],
    'Service:  ' . ($data['service'] ?: 'Not specified'),
];
if ($data['area'] !== '') {
    $lines[] = 'Came from: 3D muscle map (' . $data['area'] . ')';
}
$lines[] = '';
$lines[] = 'Concern:';
$lines[] = $data['message'] ?: '(none given)';
$lines[] = '';
$lines[] = 'Reply to this email to answer the patient directly. Call back within 1 business hour.';

$subject = '=?UTF-8?B?' . base64_encode('Booking request: ' . $data['name']) . '?=';
$headers = implode("\r\n", [
    'From: Apex Physio Website <' . $CONFIG['from'] . '>',
    'Reply-To: ' . $data['email'],
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);
$mailed = @mail($CONFIG['to'], $subject, implode("\n", $lines), $headers, '-f' . $CONFIG['from']);

if (!$saved && !$mailed) {
    error_log('Apex booking: could not save or email a request from ' . $data['email']);
    respond(false, 500, ['error' => 'server']);
}
respond(true);
