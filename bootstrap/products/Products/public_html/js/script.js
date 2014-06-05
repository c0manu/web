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
    
    showProducts();
    
    $('#formQuantity').keypress(function(e){
        if(e.which === 13) {
            $('#saveBtn').focus();
        }
    });
    $('#formName').keypress(function(e){
        if(e.which === 27) {
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
     
    ok = validateFields(price, qty);
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
                $('#product' + id).remove();
                DisplayRow(productId, gProducts[productId]);
                
                
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
            }).done(function() {
           
            $('#product' + id).remove();
            delete gProducts[id];
            closePopup();
            });
}

function DisplayRow(id, obj){
    
     //update layout
    var $tr = $('<tr id="product' + id + '"></tr>');
    //number
    var $nbr = $('<td class="number">' + id + '. </td>');
    $nbr.appendTo($tr);
    //name
    var $name = $('<td class="name">' + obj.name + ' </td>');
    $name.appendTo($tr);
    //price
    var $price = $('<td class="price"> ' + obj.price + ' &euro; </td>');
    $price.appendTo($tr);
    //quantity
    var $qty = $('<td class="qty"> ' + obj.qty + ' buc </td>');
    $qty.appendTo($tr);
    //action buttons
    var $btn = $('<td class="actions"></td>');
    $btn.appendTo($tr);
    var $btnUpdate = $('<input type="button" value="Update" onclick="updateProduct(' + id + ')"/>');
    $btnUpdate.appendTo($btn);
    var $btnDelete = $('<input type="button" value="Delete" onclick="deleteProduct(' + id + ')"/>');
    $btnDelete.appendTo($btn);
   

    $tr.appendTo($('#products'));
    
}
function validateFields(price, qty){
    var isValid = true;
     if ($.isNumeric(price)=== false) {
         $('#formPrice').val('');
        // $('#errContainer').val('*Price must be integer');
         alert('Invalid price');
         isValid = false;
    }
    return isValid;
}
function showProducts(){
//    $('.main').addClass('hidden');
//    $('#showProd').removeClass('hidden');
    $('.main').hide();
    $('#showProd').show();
   
}

function showCustomer(){
//    $('.main').addClass('hidden');
//    $('#showCust').removeClass('hidden');
    $('.main').hide();
    $('#showCust').show(); 
}