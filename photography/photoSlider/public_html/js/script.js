gNbr = 0;
gNbrInPage = 18;
gCurrentId = 1;
gPictures = {};
gAllPictures = {};
gPage = 1;
maxPages = {};

$(document).ready(function() {

    handleKeyDownEvent();
    displayNavigation();
    $('#image-wrapper').click(function(e) {
        //  closeImage(); 
    });

    $('#gallery').hover(function() {
        $('.tree').stop().fadeIn(200);
    }, function() {
        $('.tree').stop().fadeOut(200);
    });

    $(window).on('hashchange', function() {
        loadPage(window.location.hash);
    });
    loadPage(window.location.hash);

});

function loadPage(hash) {

    $('#contact').hide();
    $('.image').remove();
    switch (hash) {

        case'':
            loadPictures('home');
            break;
        case '#nature':
            loadPictures('nature');
            break;
        case '#contact':
            loadContact();
            break;
        case '#travel':
            loadPictures('travel');
            break;
        default:
            break;
    }
}

function loadPictures(category) {

    $.ajax({
        type: "POST",
        dataType: "text",
        url: "loadPictures.php",
        data: {type: category}
    }).done(function(msg) {
        gAllPictures = {};
        gPictures = {};

        gPictures = $.parseJSON(msg);
        gNbr = gPictures.length;

        $.each(gPictures, function(key, value) {
            gAllPictures[key] = value;
        });
        $('.image').remove();
        for (var i = 0; i < gNbrInPage; i++) {
            displayPictures(i, gAllPictures[i], 'img/' + category + '/');
        }
        gPage = 1;
        maxPages[category] = parseInt(gNbr / gNbrInPage)
        if (gNbr % gNbrInPage) {
            maxPages[category] += 1;
        }
        if (maxPages[category] == 1) {
            $('#page-left-div').hide();
            $('#page-right-div').hide();
        }
        else {
            $('#page-right-div').show();
        }
    });
}
function nextPage() {

    switch (window.location.hash) {
        case '#nature':
            if (gPage < maxPages['nature']) {
                $('.image').remove();
                gPage++;
                for (var i = (gPage - 1) * 18; i < gNbrInPage * gPage; i++) {
                    if (gAllPictures[i] != null) {
                        displayPictures(i, gAllPictures[i], 'img/nature/');
                    }
                }
                $('#page-left-div').show();
                if (gNaturePage == maxPages['nature']) {
                    $('#page-right-div').hide();
                }
            }
            break;
    }
}
function previousPage() {
    switch (window.location.hash) {
        case '#nature':
            if (gPage > 1) {
                $('.image').remove();
                gPage--;
                for (var i = (gPage - 1) * 18; i < gNbrInPage * gPage; i++) {
                    if (gAllPictures[i] != null) {
                        displayPictures(i, gAllPictures[i], 'img/nature/');
                    }
                }
                $('#page-right-div').show();
                if (gPage == 1) {
                    $('#page-left-div').hide();
                }
            }
            break;
    }
}
function displayPictures(key, name, path) {

    var $image;
    var $imageDiv;

    $imageDiv = $('<div id="image-div' + key + '" class="image" onclick="openImage(\'' + path + '\',' + key + ')"></div>');
    $imageDiv.appendTo($('#content-wrapper'));
    $image = $('<img id="img' + key + '" class="image pic" src="' + path + '' + name + '">');
    $image.appendTo($imageDiv);
}
function openImage(path, id) {

    $('.large-image').remove();
    gCurrentId = id;
    var $largeImage = $('<img  class="large-image ' + window.location.hash + '" src="' + path + '/' + gPictures[gCurrentId] + '">');
    $largeImage.appendTo($('#large-image-container'));
    $('#image-wrapper').show();
    $('#cover').fadeIn(200);
}
function closeImage() {

    $('#image-wrapper').fadeOut(200);
    $('#cover').fadeOut(200);
}

function handleKeyDownEvent() {

    $(document).keydown(function(e) {
        if (e.keyCode === 27) { //escape 
            closeImage();
        }
        if (e.keyCode === 37) { // left
            goLeft();
        }
        else if (e.keyCode === 39) { // right
            goRight();
        }
    });
}
function getPath() {

    var path = 'img/home/';
    switch (window.location.hash) {
        case '':
            path = 'img/home';
            break;
        case '#nature':
            path = 'img/nature';
        case '#travel':
            path = 'img/travel';
            break;
    }
    return path;
}
function goLeft() {

    var path = getPath();
    $('.large-image').remove();
    gCurrentId -= 1;
    if (gCurrentId <= 0) {
        gCurrentId = gNbr - 1;
    }
    $largeImage = $('<img  class="large-image ' + window.location.hash + '" src="' + path + '/' + gPictures[gCurrentId] + '">');
    $largeImage.appendTo($('#large-image-container'));
}
function goRight() {

    var path = getPath();
    $('.large-image').remove();
    gCurrentId = gCurrentId + 1;
    if (gCurrentId === gNbr) {
        gCurrentId = 0;
    }
    $largeImage = $('<img  class="large-image ' + window.location.hash + '" src="' + path + '/' + gPictures[gCurrentId] + '">');
    $largeImage.appendTo($('#large-image-container'));
}
function displayNavigation() {

    $("#go-left-img").hide();
    $("#go-right-img").hide();

    $('#go-left-div').hover(function() {
        $("#go-left-img").show();

    }, function() {
        $("#go-left-img").hide();
    });

    $('#go-right-div').hover(function() {
        $("#go-right-img").show();

    }, function() {
        $("#go-right-img").hide();
    });
}
function loadContact() {
    $('.image').remove();
    $('#contact').show();
}
function setPageHash(name) {

    switch (name) {
        case 'home':
            window.location.hash = '';
            break;
        case 'nature':
            window.location.hash = 'nature';
            break;
        case 'travel':
            window.location.hash = 'travel';
            break;
        case 'contact':
            window.location.hash = 'contact';
            break;
        default:
            break;
    }

}