gProducts = {};
gNr = 100;

$(document).ready(function(){
    
     $.ajax({
    type: "POST",
        dataType: 'text',
        url: "dbOperation.php",
        data: {type: 'SELECT'}
    }).done(function(msg) {
        
       gProducts = $.parseJSON(msg);
       
       $.each(gProducts, function(key, value){
           DisplayRow(key, value);
       });
    });
    
    $('#formQuantity').keypress(function(e){
        if(e.which == 13) {
            $('#saveBtn').focus();
        }
    });
    $('#formName').keypress(function(e){
        if(e.which == 27) {
            alert('ppp');
           closePopup();
        }
    });
    
});

function closePopup() {
    $('#window-wrapper').fadeOut(200);

    //clear form fields
    $('#formName').val('');
    $('#formPrice').val('');
    $('#formQuantity').val('');
    $('#productId').val('-1');

    $('#cover').fadeOut(200);
}
function addProduct() {
    $('#window-wrapper').fadeIn(200);
    $('#cover').fadeIn(200);
    $( "#formName" ).focus();
}

function saveProduct() {
    var name, price, qty;
    var ok = true;
    name = $('#formName').val();
    price = $('#formPrice').val();
    qty = $('#formQuantity').val();
    price = parseFloat(price);
    qty = parseFloat(qty);
    if ($.isNumeric(price)=== false) {
        alert('Invalid price');
        ok = false;
    }
    if (ok === true) {
        var productId = $('#productId').val();
        if (productId === "-1") {
            //ajax call - insert db 
            $.ajax({
            type: "POST",
                    dataType: 'text',
                    url: "dbOperation.php",
                    data: {type: 'INSERT', name: name, price: price, qty: qty}
            }).done(function(msg) {
                var id = parseInt(msg);

                gProducts[id] = {};
                gProducts[id].name = name;
                gProducts[id].price = price;
                gProducts[id].qty = qty;
                
                DisplayRow(id, gProducts[id]);
              
                closePopup();
            });
        } else {
            $.ajax({
            type: "POST",
                    dataType: 'text',
                    url: "dbOperation.php",
                    data: {type: 'UPDATE', id:productId, name: name, price: price, qty: qty}
            }).done(function() {   
                gProducts[productId].name = name;
                gProducts[productId].price = price;
                gProducts[productId].qty = qty;

                closePopup();
                //update layout
                $('#product' + productId + " .name").text(gProducts[productId].name);
                $('#product' + productId + " .price").html(gProducts[productId].price + " &euro;");
                $('#product' + productId + " .qty").text(gProducts[productId].qty + " buc");
            });
        }
    }
}
function updateProduct(id) {
    $('#window-wrapper').fadeIn(200);
    $('#cover').fadeIn(200);

    $('#formName').val(gProducts[id].name);
    $('#formPrice').val(gProducts[id].price);
    $('#formQuantity').val(gProducts[id].qty);
    $('#productId').val(id);
}

function deleteProduct(id) {
   
    //ajax call - delete
    $.ajax({
            type: "POST",
            dataType: 'text',
            url: "dbOperation.php",
            data: {type: 'DELETE', id: id}
            }).done(function(msg) {
           
            $('#product' + id).remove();
            delete gProducts[id];
            closePopup();
            });
}

function DisplayRow(id, obj){
    
     //update layout
    var $divProductRow = $('<div id="product' + id + '" class="product"></div>');
    //numbert
    var $divNbr = $('<div class="number">' + id + '. </div>');
    $divNbr.appendTo($divProductRow);
    //name
    var $divName = $('<div class="name">' + obj.name + ' </div>');
    $divName.appendTo($divProductRow);
    //price
    var $divPrice = $('<div class="adress"> ' + obj.price + ' &euro; </div>');
    $divPrice.appendTo($divProductRow);
    //quantity
    var $divQty = $('<div class="qty"> ' + obj.qty + ' buc </div>');
    $divQty.appendTo($divProductRow);
    //action buttons
    var $divBtn = $('<div class="actions"></div>');
    $divBtn.appendTo($divProductRow);
    var $btnUpdate = $('<input type="button" value="UPD" onclick="updateProduct(' + id + ')"/>');
    $btnUpdate.appendTo($divBtn);
    var $btnDelete = $('<input type="button" value="DEL" onclick="deleteProduct(' + id + ')"/>');
    $btnDelete.appendTo($divBtn);

    $divProductRow.appendTo($('#products'));
    
}
function validateFields(){
    var isValid = true;
    return isValid;
}