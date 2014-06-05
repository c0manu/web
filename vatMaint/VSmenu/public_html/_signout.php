<?php
    session_start();

    if(isset($_SESSION['signed_in'])){
        unset($_SESSION['signed_in']);
    }
    if(isset($_SESSION['username'])){
        unset($_SESSION['username']);
    }
    
    session_destroy();
    header("Location: /Training/vatMaint/VSmenu/public_html/index.php");
?>