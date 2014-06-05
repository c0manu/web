var gVATDet = {};
var gMsg='';
var gDivDisplayResult;
var gState = '';
var gNr = 100;
var gRowIndex = 1;
var gLastRowIndex = 0;

$(document).ready(function() {

    //display the date and time on the screen
    showTime();
    
    initializeVatDetControls();
    //load vat records from DB
    loadDbRecords();
    onLoad();
    //disable the selection 
    disableSelection(document.body);
    //handle click event on the list menu on the right sidebar
    handleTreeMenu();
    
    handleKeyDownEvent();
});

function handleTreeMenu(){
    
     $('label.dataMaint').click(function() {
        $('li.leafData').toggleClass( 'hidden' );
        $(this).toggleClass('opened closed');
        $('label.miscMaint').removeClass('closed');
        $('label.miscMaint').removeClass('opened');
        $('label.miscMaint').addClass('closed');
        $('li.leafMisc').addClass('hidden');
    });
     $('label.miscMaint').click(function() {
        $('li.leafMisc').toggleClass( 'hidden' );
        $(this).toggleClass('opened closed');
        $('label.dataMaint').removeClass('closed');
        $('label.dataMaint').removeClass('opened');
        $('label.dataMaint').addClass('closed');
        $('li.leafData').addClass('hidden');
    });
}
function closeTreeMenu() {
    
    $('label.miscMaint').removeClass('closed');
    $('label.miscMaint').removeClass('opened');
    $('label.miscMaint').addClass('closed');
    $('li.leafMisc').addClass('hidden');
 
    $('label.dataMaint').removeClass('closed');
    $('label.dataMaint').removeClass('opened');
    $('label.dataMaint').addClass('closed');
    $('li.leafData').addClass('hidden');
}
function showTime() {

    var t;
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();

    var datetime = d.getFullYear() + '-' +
            (('' + month).length < 2 ? '0' : '') + month + '-' +
            (('' + day).length < 2 ? '0' : '') + day + ' ' +
            (('' + hour).length < 2 ? '0' : '') + hour + ':' +
            (('' + minute).length < 2 ? '0' : '') + minute + ':' +
            (('' + second).length < 2 ? '0' : '') + second;

    $('#datetime').html(datetime);
    t = setTimeout(function() {
        showTime();
    }, 500);
}
function loadDbRecords() {

    $.ajax({
        type: "POST",
        dataType: 'text',
        url: "dbOperation.php",
        data: {type: 'SELECT'}
    }).done(function(msg) {
        gLastRowIndex = 0;
        gVATDet = $.parseJSON(msg);
        $.each(gVATDet, function(key, value) {
            gLastRowIndex++;
            DisplayRow(key, value);
        });
        selectTableRowById(1);
        handleClickTableRowEvent();
    });
}
function DisplayRow(id, obj) {

    var specVatDescr;

    specVatDescr = $('#optSpecialVat option[value =' + obj.specialVat + ']').text();
    //update layout
    var $tr = $('<tr id="vatElem' + id + '"></tr>');
    //vatcode
    var $vatcode = $('<td class="vatCode">' + obj.vatcode + '</td>');
    $vatcode.appendTo($tr);
    //description 1
    var $descr1 = $('<td class="descr1">' + obj.descr1 + ' </td>');
    $descr1.appendTo($tr);
    //description 2
    var $descr2 = $('<td class="descr2"> ' + obj.descr2 + ' </td>');
    $descr2.appendTo($tr);
    //vat
    var $vat = $('<td class="vat"> ' + obj.vat + ' </td>');
    $vat.appendTo($tr);
    //special vat
    var $speciaVat = $('<td class="specialVat">  ' + specVatDescr + ' </td>');
    $speciaVat.appendTo($tr);

    $tr.appendTo($('#tblVatElem'));
}
function insertVat() {

    var id;
    var alpha, vat, descr1, descr2, rpc1, rpc2, specialVat;

    id = gFormVatCode.val();
    alpha = gFormAlpha.val();
    vat = gFormVat.val();
    descr1 = gFormDescr1.val();
    descr2 = gFormDescr2.val();
    specialVat = gFormSpecialVat.val();
    rpc1 = gFormReceipt1.val();
    rpc2 = gFormReceipt2.val();

    //ajax call - insert db 
    $.ajax({
        type: "POST",
        dataType: 'text',
        url: "dbOperation.php",
        data: {type: 'INSERT', id: id, vat: vat, descr1: descr1, descr2: descr2,
            specialVat: specialVat, rpc1: rpc1, rpc2: rpc2,
            alphacode: alpha}
    }).done(function() {
        gVATDet[id] = {};
        gVATDet[id].vatcode = id;
        gVATDet[id].descr1 = descr1;
        gVATDet[id].descr2 = descr2;
        gVATDet[id].vat = vat;
        gVATDet[id].alphacode = alpha;
        gVATDet[id].specialVat = specialVat;
        gVATDet[id].rpcDescr1 = rpc1;
        gVATDet[id].rpcDescr2 = rpc2;
        
        displaySqlResult('Record inserted succesfully!');
           
        DisplayRow(id, gVATDet[id]);
        gLastRowIndex += 1;
        gRowIndex = gLastRowIndex;
        selectTableRowByVatcode(id);
        disalbeVatDetControls();
        handleClickTableRowEvent();
        $('#queryBtn').show();
        $('#saveCancelBtn').hide();
    });
}
function reloadDbRecords() {

    $.each(gVATDet, function(key) {
        $('#vatElem' + key).remove();
    });
    loadDbRecords();
    gRowIndex = 1;
}
function addVAT() {

    gState = 'add';
    clearVatDetControls();
    enableVatDetControls();
    gFormVatCode.focus();
    $('#queryBtn').hide();
    $('#saveCancelBtn').show();
}
function editVAT() {

    gState = 'edit';
    enableVatDetControls();
    gFormVatCode.attr('disabled', true);
    $('#queryBtn').hide();
    $('#saveCancelBtn').show();
}
function updateVat() {

    var id;
    var alpha, vat, descr1, descr2, rpc1, rpc2, specialVat;
    var specVatDescr;
    id = gFormVatCode.val();
    alpha = gFormAlpha.val();
    vat = gFormVat.val();
    descr1 = gFormDescr1.val();
    descr2 = gFormDescr2.val();
    specialVat = gFormSpecialVat.val();
    rpc1 = gFormReceipt1.val();
    rpc2 = gFormReceipt2.val();
    specVatDescr = $('#optSpecialVat option[value =' + specialVat + ']').text();
    
    if (validateFields() === true) {

        $.ajax({
            type: "POST",
            dataType: 'text',
            url: "dbOperation.php",
            data: {type: 'UPDATE', id: id, vat: vat, descr1: descr1, descr2: descr2,
                specialVat: specialVat, rpc1: rpc1, rpc2: rpc2,
                alphacode: alpha}
        }).done(function() {

            gVATDet[id].descr1 = descr1;
            gVATDet[id].descr2 = descr2;
            gVATDet[id].vat = vat;
            gVATDet[id].specialVat = specialVat;
            gVATDet[id].alphacode = alpha;
            gVATDet[id].rpcDescr1 = rpc1;
            gVATDet[id].rpcDescr2 = rpc2;

            displaySqlResult('Record updated succesfully!');

            $('#vatElem' + id).find('td.descr1').text(descr1);
            $('#vatElem' + id).find('td.descr2').text(descr2);
            $('#vatElem' + id).find('td.vat').text(vat);
            $('#vatElem' + id).find('td.specialVat').text(specVatDescr);

            disalbeVatDetControls();
            $('#queryBtn').show();
            $('#saveCancelBtn').hide();
        });
    }
}
function displaySqlResult(message) {
    gDivDisplayResult.html(message);
    gDivDisplayResult.addClass('borderDiv');
    setTimeout(function() {
        gDivDisplayResult.html('');
    }, 3000);
    setTimeout(function() {
        gDivDisplayResult.removeClass('borderDiv');
    }, 3000);
}
function deleteRecord() {

    $('#window-wrapper').fadeIn(200);
    $('#cover').fadeIn(200);
    $("#formName").focus();
}
function closePopup() {
    $('#window-wrapper').fadeOut(200);

    //clear form fields
    $('#formName').val('');
    $('#formPrice').val('');
    $('#formQuantity').val('');
    $('#productId').val('-1');

    $('#cover').fadeOut(200);
}
function closeError() {
    $('#window-wrapper').fadeOut(200);

    $('#cover').fadeOut(200);
}
function deleteVat() {

    var id;

    id = gFormVatCode.val();
    //ajax call - delete       

    $.ajax({
        type: "POST",
        dataType: 'text',
        url: "dbOperation.php",
        data: {type: 'DELETE', id: id}
    }).done(function() {

        delete gVATDet[id];
        $("#vatElem" + id).remove();
        console.log('1. last index:' + gLastRowIndex);
        console.log('1. row index:' + gRowIndex);

        if (gLastRowIndex !== 0) {
            if (gRowIndex === gLastRowIndex) {
                gRowIndex -= 1;
                selectTableRowById(gRowIndex);
            }
            else if ((gRowIndex) === 1) {
                selectTableRowById(1);
            }
            else {
                selectTableRowById(gRowIndex);
            }
        }
        gLastRowIndex -= 1;
        closePopup();
        
        displaySqlResult('Record deleted succesfully!');
    });

}
function saveVAT() {

    if (gState === 'add')
        insertVat();
    else if (gState === 'edit')
        updateVat();
}
function validateFields() {

    var isValid = true;
    if ($.isNumeric(gFormVat.val()) === false) {
        gFormVat.val('');
        displaySqlResult('Vat Code must have integer value');
        isValid = false;
    }
    return isValid;
}
function selectTableRowById(id) {

    var $row = $('table tr:eq(' + id + ')');
    var $rowVat = $row.find('td.vatCode').text();
    $('tr').removeClass('selected ');
    $row.addClass('selected');
    loadVatDetails($rowVat);
}
function selectTableRowByVatcode(vatcode) {

    $('tr').removeClass('selected ');
    $('#vatElem' + vatcode).addClass('selected');
    loadVatDetails(vatcode);
}
function showVAT() {

    $('.main').hide();
    $('#showVAT').show();
    $('#showVAT').addClass('fullScreen');
    $('#rightsidebar').show();
    $('#saveCancelBtn').hide();
    $('#queryBtn').show();
    selectTableRowById(1);
    disalbeVatDetControls();
    handleClickTableRowEvent();
}
function handleClickTableRowEvent() {

    $('table tbody tr').click(function() {
        var vatcode = $(this).find('td.vatCode').text();
        $('tr').removeClass('selected ');
        $(this).addClass('selected');
        gRowIndex = ($(this).index() + 1);
        loadVatDetails(vatcode);
    });
}
function handleKeyDownEvent() {

    $(document).keydown(function(e) {
        navigateTable(e);
        if (e.keyCode === 27) {
            if (gState === 'add' || gState === 'edit') {
                cancelOperation();
            }
            else
                onLoad();
        }

    });
}

function moveUp(e) {

   e.preventDefault();
    gRowIndex -= 1;
    if (gRowIndex > 0) {
        selectTableRowById(gRowIndex);
    }
    else {
        gRowIndex = gLastRowIndex;
        selectTableRowById(gLastRowIndex);
    }
}
function moveDown(e) {

    e.preventDefault();
    gRowIndex += 1;
    if (gRowIndex <= gLastRowIndex) {
        selectTableRowById(gRowIndex);
    }
    else {
        gRowIndex = 1;
        selectTableRowById(gRowIndex);
    }
}
function navigateTable(e) {

    
    if (e.keyCode === 38) { // move up
        cancelOperation();
        moveUp(e);
    }
    if (e.keyCode === 40) { // move down
        cancelOperation();
        moveDown(e);
    }
}
function showCustomer() {
    $('.main').hide(); 
    $('#showCust').show();
    $('#showCust').addClass('fullScreen');
    $('#rightsidebar').show();
}
function onLoad() {
    $('.main').hide();
    $('#mainPage').show();
    $('.sidebar').show();
    $('#rightsidebar').hide();
    closeTreeMenu();
    
}
function disableSelection(target){
	if (typeof target.onselectstart!=="undefined") 				//Internet Explorer
		target.onselectstart=function(){return false;};
	else if (typeof target.style.MozUserSelect!=="undefined") 	//Firefox
		target.style.MozUserSelect="none";
	else 														//Opera etc...
		target.onmousedown=function(){return false;};
	target.style.cursor = "default";
}

	
function loadVatDetails(id) {

    gFormVatCode.val(id);
    gFormAlpha.val(gVATDet[id].alphacode);
    gFormVat.val(gVATDet[id].vat);
    gFormDescr1.val(gVATDet[id].descr1);
    gFormDescr2.val(gVATDet[id].descr2);
    gFormReceipt1.val(gVATDet[id].rpcDescr1);
    gFormReceipt2.val(gVATDet[id].rpcDescr2);
    gFormSpecialVat.val(gVATDet[id].specialVat);
}
function initializeVatDetControls() {

    gFormVatCode = $('#formVatCode');
    gFormAlpha = $('#formAlpha');
    gFormVat = $('#formVat');
    gFormSpecialVat = $('#optSpecialVat');
    gFormDescr1 = $('#formDescr1');
    gFormDescr2 = $('#formDescr2');
    gFormReceipt1 = $('#formReceipt1');
    gFormReceipt2 = $('#formReceipt2');
    gDivDisplayResult = $('#displayResult');
}
function clearVatDetControls() {

    gFormVatCode.val('');
    gFormAlpha.val('');
    gFormVat.val('');
    gFormDescr1.val('');
    gFormDescr2.val('');
    gFormSpecialVat.val('1');
    gFormReceipt1.val('');
    gFormReceipt2.val('');
}
function disalbeVatDetControls() {

    gFormVatCode.attr('disabled', true);
    gFormAlpha.attr('disabled', true);
    gFormVat.attr('disabled', true);
    gFormSpecialVat.attr('disabled', true);
    gFormDescr1.attr('disabled', true);
    gFormDescr2.attr('disabled', true);
    gFormReceipt1.attr('disabled', true);
    gFormReceipt2.attr('disabled', true);
}
function enableVatDetControls() {

    gFormVatCode.attr('disabled', false);
    gFormAlpha.attr('disabled', false);
    gFormVat.attr('disabled', false);
    gFormSpecialVat.attr('disabled', false);
    gFormDescr1.attr('disabled', false);
    gFormDescr2.attr('disabled', false);
    gFormReceipt1.attr('disabled', false);
    gFormReceipt2.attr('disabled', false);
}
function cancelOperation() {
    var id;
    if (gState === 'edit') {
        id = gFormVatCode.val();
        gFormAlpha.val(gVATDet[id].alphacode);
        gFormVat.val(gVATDet[id].vat);
        gFormDescr1.val(gVATDet[id].descr1);
        gFormDescr2.val(gVATDet[id].descr2);
        gFormReceipt1.val(gVATDet[id].rpcDescr1);
        gFormReceipt2.val(gVATDet[id].rpcDescr2);
    }
    else if (gState === 'add') {
        selectTableRowById(1);
    }
    disalbeVatDetControls();
    gState = '';
    $('#queryBtn').show();
    $('#saveCancelBtn').hide();    
}