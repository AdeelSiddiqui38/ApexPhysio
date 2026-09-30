<?php
/**
 * Returns the current waitlist signup count as JSON.
 * The count is incremented by send-booking.php on each successful,
 * non-spam submission — this is a real count, not a placeholder.
 */
header('Content-Type: application/json');
header('Cache-Control: no-store');

$file  = __DIR__ . '/waitlist-count.txt';
$count = is_file($file) ? (int) trim(file_get_contents($file)) : 0;

echo json_encode(['count' => $count]);
