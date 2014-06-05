<?php

  // Create connection
  $con = new PDO("mysql:host=localhost;dbname=trainingdb",'root','');

  $username = $_POST['username'];
  //$password_sha1 = sha1($_POST['password']);
  $password = $_POST['password'];

  // echo '<pre>';
  // var_dump($_SERVER);

  $sql  = "SELECT username ";
  $sql .= "FROM user ";
  $sql .= "WHERE username=:u AND password_sha1=:p";
  $stmt = $con->prepare($sql);

  $stmt->execute(array(
            ":u"=>$username,
			":p"=>$password
            //":p"=>$password_sha1
          ));
  $row = $stmt->fetch();

  // clear out any existing session that may exist
  session_start();
  session_destroy();
  session_start();
  //echo "<pre>";
  //var_dump($_SERVER);
  //die();
  if ($row) {
     $_SESSION['signed_in'] = true;
     $_SESSION['username'] = $username;
     
     header("Location: /Training/vatMaint/VSmenu/public_html/_main.php");
   } else {
     $_SESSION['flash_error'] = "Invalid username or password";
     $_SESSION['signed_in'] = false;
     $_SESSION['username'] = null;
     header("Location: /Training/vatMaint/VSmenu/public_html/index.php");
  }
?>