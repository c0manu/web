<?php

// Create connection
$con = mysqli_connect("localhost", "root", "", "TrainingDb");

// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
} else {
    if (isset($_POST['type'])) {
        if (isset($_POST['name']))
            $name = $_POST['name'];
        if (isset($_POST['price']))
            $price = $_POST['price'];
        if (isset($_POST['qty']))
            $qty = $_POST['qty'];
         if (isset($_POST['id']))
            $id = $_POST['id'];

        switch ($_POST['type']) {
            case 'SELECT':
                $result = mysqli_query($con,"SELECT * FROM Product");
                $FetchData = array();
                while ($row = mysqli_fetch_array($result)) {
                    $arrRow = array();

                    $arrRow["name"] = $row['Name'];
                    $arrRow["price"] = $row['Price'];
                    $arrRow["qty"] = $row['Qty'];  
                    $FetchData[$row['Id']] = $arrRow;
                }
                
                echo json_encode($FetchData);
                break;
            case 'INSERT':
                mysqli_query($con, "INSERT INTO Product (Name, Price, Qty)
                VALUES ('$name', $price, $qty)");
                
                $id = mysqli_insert_id($con);
                
                echo $id;
                
                break;
            case 'UPDATE':
                $result = mysqli_query($con, "update Product set Name = '$name', Price = $price 
                    , Qty = $qty where Id = $id");
                echo $result;
                break;
            case 'DELETE':
                $result = mysqli_query($con, "delete from Product where Id = $id");
                echo $result;
                break;
            default:
                break;
        }
    }
}

mysqli_close($con);
?>