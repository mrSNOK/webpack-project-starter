<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

$login = 'noreply.horeca.webinar.mailer@gmail.com';//
$pass = 'udLjJXSYyLQsV2REA9SdSJvw';//
$recipient = 'onlineuniverse.digital@gmail.com';
$subject = "Новая заявка на сайт";//.$_SERVER[HTTP_HOST];
$formHeader = "Вам отправили:\n\n";


function clean_string($string) {
    $bad = ["content-type","bcc:","to:","cc:","href"];
    return str_replace($bad,"",$string);
}

function get_posted($formHeader){
    foreach($_POST as $key => $value){
        $formHeader.=$key.": ".clean_string($value)."\n";
    }
    return $formHeader;
}

function send_with_gmail($login,$pass,$recipient,$subject,$message){
    $mail = new PHPMailer(true);///enables debugging
    try{
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = '587';
        ///$mail->isHTML();
        $mail->Username = $login;
        $mail->Password = $pass;
        $mail->SetFrom($login);
        $mail->AddReplyTo($login);
        $mail->Subject = $subject;
        $mail->Body = $message;
        $mail->AddAddress($recipient);

        $mail->Send();
      echo "Message Sent OK\n";
    } catch (phpmailerException $e) {
      echo $e->errorMessage(); //Pretty error messages from PHPMailer
    } catch (Exception $e) {
      echo $e->getMessage(); //Boring error messages from anything else!
    }
}
function sendWithHosterSMTP($recipient,$subject,$message){
    $result = mail($recipient,$subject,$message);
    if(!$result) {
         echo "unable to send mail!";
    } else {
        echo "email sent successfully!";
    }
}
$message = get_posted($formHeader);
///send_with_gmail($login,$pass,$recipient,$subject,$message);
sendWithHosterSMTP($recipient,$subject,$message);
?>