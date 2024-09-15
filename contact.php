

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // reCAPTCHA Secret Key
    $secret = 'YOUR_SECRET_KEY';
    $response = $_POST['g-recaptcha-response'];
    $remoteip = $_SERVER['REMOTE_ADDR'];

    // Verify reCAPTCHA
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $secret,
        'response' => $response,
        'remoteip' => $remoteip
    ];
    $options = [
        'http' => [
            'method'  => 'POST',
            'content' => http_build_query($data),
        ]
    ];
    $context  = stream_context_create($options);
    $verify = file_get_contents($url, false, $context);
    $captcha_success = json_decode($verify);

    if ($captcha_success->success) {
        // Collect form data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $subject = htmlspecialchars($_POST['subject']);
        $message = htmlspecialchars($_POST['message']);

        // Set email destination and subject
        $to = 'your-email@example.com'; // Your email address
        $subject_line = "Contact Form Submission: $subject";
        $body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message";
        $headers = "From: $email";

        // Send email
        if (mail($to, $subject_line, $body, $headers)) {
            echo "Message sent successfully!";
        } else {
            echo "Failed to send message.";
        }
    } else {
        echo "reCAPTCHA verification failed. Please try again.";
    }
}
?>
