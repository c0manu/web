<?php
session_start();

if(!isset($_SESSION['username'])){
   die();
}

// Create connection
$con = mysqli_connect("localhost", "root", "", "TrainingDb");

// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
} else {
    if (isset($_POST['type'])) {
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

        switch ($_POST['type']) {
            case 'SELECT':
                $result = mysqli_query($con, "SELECT * FROM VAT");

                $FetchData = array();
               
                while ($row = mysqli_fetch_array($result)) {
                    $arrRow = array();

                    $arrRow["vatcode"] = $row['VATCODE'];
                    $arrRow["alphacode"] = $row['Alphacode'];
                    $arrRow["descr1"] = $row['DESCR1'];
                    $arrRow["descr2"] = $row['DESCR2'];
                    $arrRow["vat"] = $row['VAT'];
                    $arrRow["specialVat"] = $row['SPECIAL_VAT'];
                    $arrRow["rpcDescr1"] = $row['RECEIPT_DESCRIPTION_1'];
                    $arrRow["rpcDescr2"] = $row['RECEIPT_DESCRIPTION_2'];

                    $FetchData[$row['VATCODE']] = $arrRow;
                   
                }
                 /* free result set */
                $result->close();
                echo json_encode($FetchData);
                break;
            case 'INSERT':
                mysqli_query($con, "INSERT INTO VAT (VATCODE, Alphacode, DESCR1, DESCR2, VAT, SPECIAL_VAT
                                                     ,RECEIPT_DESCRIPTION_1, RECEIPT_DESCRIPTION_2)
                VALUES ($id, '$alpha', '$descr1', '$descr2', $vat,'$specialVat', '$rpc1', '$rpc2' )");

                echo $specialVat;

                break;
            case 'UPDATE':
                $result = mysqli_query($con, "update VAT set vat = $vat, Alphacode = '$alpha' 
                                       , DESCR1 = '$descr1', DESCR2 = '$descr2',  SPECIAL_VAT = '$specialVat'
                                       ,RECEIPT_DESCRIPTION_1 = '$rpc1', RECEIPT_DESCRIPTION_2 = '$rpc2'     
                                       where vatcode = $id");
                echo $result;
                break;
            case 'DELETE':
                $result = mysqli_query($con, "delete from VAT where vatcode = $id");
                echo $result;
                break;
            default:
                break;
        }
    }
}

mysqli_close($con);
?>