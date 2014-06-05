var $ = function (id) { 
	return document.getElementById(id); 
}
window.onload = function () {
    var listNode = $("image_list");
    var captionNode = $("caption");
    var imageNode = $("image");
    
    var imageLinks = listNode.getElementsByTagName("a");
    
    // Process image links
    var i, linkNode, image;
    for ( i = 0; i < imageLinks.length; i++ ) {
        linkNode = imageLinks[i];

        // Attach event handler
        linkNode.onclick = function (evt) {
            var link = this;          // link is the linkNode
            imageNode.src = link.getAttribute("href");
    		captionNode.firstChild.nodeValue = link.getAttribute("title");
     
	    	// Cancel the default action of the event
	    	if (!evt) { evt = window.event; }
		    if ( evt.preventDefault ) {
		        evt.preventDefault();          // DOM compliant code
		    }
		    else {
		        evt.returnValue = false;
		    }
		}
        // Preload image
        image = new Image();
        image.src = linkNode.getAttribute("href");
    }
    $("first_link").focus();
}
