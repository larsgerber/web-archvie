<?php
    use PHPMailer\PHPMailer\PHPMailer;

    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['body'])) {
        
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $body = $_POST['body'];
        $captcha=$_POST['key'];
        $body = wordwrap($body,100,"<br>");

        $secretKey = "6LdizdUUAAAAAB5RTDV9Y_PjMtOjjYo8YHh1UZvu";
        $ip = $_SERVER['REMOTE_ADDR'];
        $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
        $responseKeys = json_decode($response,true);

        require_once "PHPMailer/PHPMailer.php";
        require_once "PHPMailer/SMTP.php";
        require_once "PHPMailer/Exception.php";

        $mail = new PHPMailer();

        if(intval($responseKeys["success"]) == 1){

            //SMTP Settings
            $mail->isSMTP();
            $mail->Host = "smtp.gmail.com";
            $mail->SMTPAuth = true;
            $mail->Username = "hostmaster@larsgerber.ch";
            $mail->Password = '1aFZW@IJoIKUhf!DeIdxFpe6L9RH!F#12P0&gV4';
            $mail->Port = 465;
            $mail->SMTPSecure = "ssl";

            //Email Settings
            $mail->isHTML(true);
            $mail->ClearReplyTos();
            $mail->setFrom($email, 'MailBot');
            $mail->AddReplyTo($email, $name);
            $mail->addAddress("hostmaster@larsgerber.ch");
            $mail->Subject = $subject;
            $mail->Body = "<br>$name &lt;$email&gt;<br><br>$body<br>$ip";
        }

        if ($mail->send()) {
            $status = "success";
            $response = "Email is sent!";
        } else {
            $status = "failed";
            $response = "Something is wrong: <br><br>" . $mail->ErrorInfo;
        }
        exit(json_encode(array("status" => $status, "response" => $response)));
    }
?>