<?php
if($_POST)
{
    $to_email       = "contact@qerto.fr"; //Recipient email, Replace with own email here
    $subject = 'Contact via Qerto.fr';
    
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( //create JSON data
            'type'=>'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    } 

    var_dump($_POST);
    
    //Sanitize input data using PHP filter_var().
    $user_name      = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    $user_email     = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    $user_society   = filter_var($_POST["user_society"], FILTER_SANITIZE_STRING);
    $message        = filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
    
    //additional php validation
    if(strlen($user_name)<3){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
        die($output);
    }
    if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
        die($output);
    }
    if(strlen($message)<3){ //check emtpy message
        $output = json_encode(array('type'=>'error', 'text' => 'Too short message! Please enter something.'));
        die($output);
    }
    
    //email body
    $boundary = md5(uniqid(microtime(), TRUE));
    $message_body = $message."\r\n\r\n-".$user_name."\r\nEmail : ".$user_email."\r\nSociété : ".$user_society ;
    
    //proceed with PHP email.
    $headers = 'From: '.$user_name.'' . "\r\n" .
    'Reply-To: '.$user_email.'' . "\r\n" .
    'Content-Type: multipart/mixed;boundary='.$boundary."\r\n" .
    'X-Mailer: PHP/' . phpversion();


    // attachement
    if(isset($_GET['files']))
    {
        foreach($_FILES as $file)
        {
            if(move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name'])))
            {
                $file_name = $uploaddir .$file['name'];

                $uploaddir = 'uploads';
                if( !is_dir( $uploaddir )){
                    mkdir($uploaddir);
                }
                if (file_exists($file_name))
                {
                    $file_type = filetype($file_name);
                    $file_size = filesize($file_name);
                 
                    $handle = fopen($file_name, 'r') or die('File '.$file_name.'can t be open');
                    $content = fread($handle, $file_size);
                    $content = chunk_split(base64_encode($content));
                    $f = fclose($handle);
                 
                    $message_body .= '--'.$boundary."\r\n";
                    $message_body .= 'Content-type:'.$file_type.';name='.$file_name."\r\n";
                    $message_body .= 'Content-transfer-encoding:base64'."\r\n";
                    $message_body .= $content."\r\n";
                }
            }
            else
            {
                $error = true;
            }
        }

    }

    $send_mail = mail($to_email, $subject, $message_body, $headers);
    
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Merci pour votre email, nous vous répondrons le plus rapidement possible.'));
        die($output);
    }
}
?>