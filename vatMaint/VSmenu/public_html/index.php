<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="/ico/favicon.ico">
	
    <title>Sign in to Visual Store</title>
	
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="css/signin.css" rel="stylesheet">
  </head>

  <body>
    <div class="container">
      <form method="post" action="_signin.php" class="form-signin" role="form">
        <h2 class="form-signin-heading">Sign in</h2>
        <input type="text" name="username" class="form-control" placeholder="User name" required autofocus>
        <input type="password" name="password" class="form-control" placeholder="Password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div> <!-- /container -->
    <?php
    session_start();
    if (isset($_SESSION['flash_error'])) {
        //header("Location: /Training/vatMaint/VSmenu/public_html/_error.php");
    }
    ?>
        <script src="js/jquery-1.9.1.min.js"></script>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
  </body>
</html>