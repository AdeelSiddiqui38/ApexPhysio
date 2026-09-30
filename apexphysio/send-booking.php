<?php
/**
 * Apex Physio & Wellness Clinic — booking/waitlist form handler.
 * Receives the POST from #bookForm (booking.js), validates it,
 * emails the submission, and returns JSON.
 *
 * Update $to_email below if the clinic inbox changes.
 */

header('Content-Type: application/json');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot spam trap — real users never fill this hidden field
if (!empty($_POST['bot-field'])) {
    // Silently pretend success so bots don't learn anything
    echo json_encode(['ok' => true]);
    exit;
}

function clean($v) {
    return trim(strip_tags((string) $v));
}

$name    = clean($_POST['name'] ?? '');
$phone   = clean($_POST['phone'] ?? '');
$email   = clean($_POST['email'] ?? '');
$service = clean($_POST['service'] ?? 'Not specified');
$message = clean($_POST['message'] ?? '');

// Basic validation
$errors = [];
if ($name === '') $errors[] = 'Name is required';
if ($phone === '') $errors[] = 'Phone is required';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email is required';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => implode(', ', $errors)]);
    exit;
}

$to_email   = 'hello@apex-physio.ca';
$subject    = 'New Waitlist Signup — Apex Physio & Wellness Clinic';
$body       = "New waitlist / booking-interest signup from apex-physio.ca\n\n"
            . "Name: {$name}\n"
            . "Phone: {$phone}\n"
            . "Email: {$email}\n"
            . "Service Interest: {$service}\n"
            . "Message: " . ($message !== '' ? $message : '(none)') . "\n\n"
            . "Submitted: " . date('Y-m-d H:i:s') . "\n";

$headers   = "From: Apex Physio Website <noreply@apex-physio.ca>\r\n"
           . "Reply-To: {$name} <{$email}>\r\n"
           . "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to_email, $subject, $body, $headers);

if ($sent) {
    // Bump the real waitlist counter (read by waitlist-count.php / shown
    // on the site as social proof). File-based — fine at this volume.
    $counterFile = __DIR__ . '/waitlist-count.txt';
    $count = is_file($counterFile) ? (int) trim(file_get_contents($counterFile)) : 0;
    $count++;
    @file_put_contents($counterFile, (string) $count, LOCK_EX);

    echo json_encode(['ok' => true, 'count' => $count]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not send email. Please call us directly at 403-000-0000.']);
}
