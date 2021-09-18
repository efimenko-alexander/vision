<?php
$to = "sasha.efimenko.02@mail.ru";
$from = trim($_POST['email']);
$subject = "Заголовок письма";

$message = htmlspecialchars($_POST['message']);
$message = urldecode($message);
$message = trim($message);

$headers = "From: $from" . "\r\n" .
    "Reply-To: $from" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

mail($to, $subject, $message, $headers);
header("Location: ".$_SERVER['HTTP_REFERER']);
