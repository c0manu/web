<?php
session_start();
if (!isset($_SESSION['username'])) {
    session_destroy();
    
    //$username = $_SESSION['username'];
    header("Location: /Training/vatMaint/VSmenu/public_html/index.php");

}

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
        <div  class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" onclick="onLoad();">Visual Store</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">Operator: <?php
                                if (isset($_SESSION['username'])) {
                                    echo $_SESSION['username'];
                                }
                                ?>
                            </a>
                        </li>  
                        
                        <li><a href="#"><div id="datetime"></div></a></li>
                        <li><a href="_signout.php">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div  id="content-wrapper" class="container-fluid">
            <div class="row">
                <div class="col-sm-3 col-md-2 sidebar main">
                    <div id="searchBox">
                        <input type="text" class="form-control" placeholder="Quick search...">  
                    </div>
                    <hr/>

                    <div class="menu-tree" >
                        <ul class="nav nav-list">
                            <li>
                                <label class="dataMaint tree-toggler nav-header closed">DATA MAINTENANCE</label>
                                <ul class="tree">
                                    <li class="leafData leaf hidden">
                                        <a href="#" onclick="showVAT();">Vat Maintenance</a>
                                    </li>
                                    <li class="leafData leaf hidden">
                                        <a href="#" onclick="showCustomer();">Customer Maintenance</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <label class="miscMaint tree-toggler nav-header closed">MISC MAINTENANCE</label>
                                <ul class="tree">
                                    <li class="leafMisc leaf hidden">
                                        <a href="#" >Mobile admin</a>
                                    </li>
                                    <li class="leafMisc leaf hidden">
                                        <a href="#" >Transportation</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="divider"></li>
                        </ul>

                    </div>
                </div>
                <div id="mainPage" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <h2 class="sub-header">Main Page</h2>
                    <ul class="media-grid">
                        <li>
                            <a href="#">
                                <img  src="ico/vat.jpg" alt="VAT" onclick="showVAT();" title="VAT">

                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src="ico/cust.jpg" alt="" onclick="showCustomer();">
                            </a>
                        </li>
                    </ul>
                </div>
                <div id="showVAT" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <div id="displayResult"> </div>
                    <h2 class="sub-header">VAT Maintenance</h2>
                    <div class="lblvatTable">List of VAT elements</div>
                    <div id="vatElemContainer" class="table-responsive">
                        <table id ="tableVat" class="table table-striped table-bordered" data-mode="reflow">
                            <thead>
                                <tr>
                                    <th>VAT Code</th>
                                    <th>Description 1</th>
                                    <th>Description 2</th>
                                    <th>VAT</th>
                                    <th>Special VAT</th>
                                </tr>
                            </thead>
                            <tbody id="tblVatElem">
                                <!-- dynamic generated table-->
                            </tbody>
                        </table>
                    </div>
                    <div class="lblvatTable">VAT details</div>
                    <div id="vatDetails">
                        <form  method="post" action="_signin.php" class="form-signin" role="form">
                            <div class="frmVatDet">
                                <label for="formVatCode">VAT Code</label><input type="text" id="formVatCode"/>
                            </div>
                            <div class="frmVatDet">
                                <label for="formAlpha">Alpha Code:</label><input type="text" id="formAlpha"/>
                            </div>
                            <div class="frmVatDet">
                                <label for="formVat">VAT</label><input type="text" id="formVat"/>
                            </div>
                            <div class="frmVatDet">
                                <label for="formSpecialVat">Special VAT</label>
                                <select id="optSpecialVat">
                                    <option id="optOne" value="1"> - </option>
                                    <option id="optTwo" value="2"> Exempt </option>
                                    <option id="optThree" value="3"> Art 41 </option>
                                </select>
                            </div>
                            <div class="frmVatDet">
                                <label for="formDescr1">Description 1</label><input type="text" id="formDescr1"/>
                            </div>
                            <div class="frmVatDet">
                                <label for="formDescr2">Description 2</label><input type="text" id="formDescr2"/>
                            </div>
                            <div class="frmVatDet">
                                <label for="formReceipt1">Receipt Description 1</label><input type="text" id="formReceipt1"/>
                            </div>
                            <div class="frmVatDet">
                                <label for="formReceipt2">Receipt Description 1</label><input type="text" id="formReceipt2"/>
                            </div>
                        </form>
                    </div> 
                </div>
                <div id="showCust" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <h2 class="sub-header">Customer Maintenance</h2>
                    <input type="button" value="Add customer" onclick="addVAT();">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="products">
                                <!-- dynamic generated table-->
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="rightsidebar" class="col-sm-10 col-md-2 sidebar">
                    <div id="sidebarBtnContainer">
                        <div id="refresBtn">
                            <input type="button" value="Refresh" onclick="reloadDbRecords();" />
                        </div>
                        <div id="queryBtn">
                            <input type="button" value="Add"  onclick="addVAT();" />
                            <input type="button" value="Edit" onclick="editVAT();"/>
                            <input type="button" value="Delete" onclick="deleteRecord();"/>
                        </div>
                        <div id="saveCancelBtn">
                            <div id="fakeDiv"></div>
                            <input type="button" value="Save" onclick="saveVAT();"/>
                            <input type="button" value="Cancel" onclick="cancelOperation();"/>
                        </div>
                        <div id="exitBtn">
                            <input type="button" value="Exit" onclick="onLoad();" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- dialog box -->
        <div id="window-wrapper">;
            <div class="window">
                <div id="dialogH">
                    <h4>Question</h4>
                    <span id="close" onclick="closePopup();">X</span>
                </div>         
                <form>
                    <div>Do you want to delete this record? </div>
                    <div id="buttonsContainer">
                        <input type="button" value="Yes" onclick="deleteVat();"/>
                        <input type="button" value="No" onclick=" closePopup();"/>
                    </div>
                </form>
            </div>  
        </div>
        <div id="cover"></div>

        <!-- core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/script.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/docs.min.js"></script>
    </body>
</html>
