<?php
    session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="shortcut icon" href="ico/favicon.ico">

        <title>Visual Store</title>
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/dashboard.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
    </head>
    <body>
        <!-- dialog box -->
        <div id="error-wrapper">;
            <div class="window">
                <div id="errContainer">
                    <h4>Error</h4>
                </div>         
                <form>
                    <div>Invalid username or password</div>
                    <div id="buttonsContainer">
                        <input type="button" value="Yes" onclick="closeError();"/>
                    </div>
                </form>
            </div>  
        </div>
        <div class="cover"></div>
        
        <?php 
         //header("Location: /Training/vatMaint/VSmenu/public_html/index.php");
        ?>

        <!-- core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/script.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/docs.min.js"></script>
    </body>
</html>