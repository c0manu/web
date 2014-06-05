<?php

  // Create connection
  $con = new PDO("mysql:host=localhost;dbname=trainingdb",'root','');


    if (isset($_POST['vat']))
        $vat = $_POST['vat'];
    if (isset($_POST['descr1']))
        $descr1 = $_POST['descr1'];
    if (isset($_POST['descr2']))
        $descr2 = $_POST['descr2'];
    if (isset($_POST['alphacode']))
        $alpha = $_POST['alphacode'];
    if (isset($_POST['rpc1']))
        $rpc1 = $_POST['rpc1'];
    if (isset($_POST['rpc2']))
        $rpc2 = $_POST['rpc2'];
    if (isset($_POST['specialVat']))
        $specialVat = $_POST['specialVat'];
    if (isset($_POST['id']))
        $id = $_POST['id'];
    

$table_name = "vat";
$con->insert( $table_name, array( 'vat' => $vat, 'descr1' => $descr1 ,
             'descr1' => $descr1, 'alphacode' => $alpha, 'rpc1' => $rpc1 
             ,'rpc2' => $rpc2, 'specialVat' => $specialVat, 'vatcode' => $id));
?>