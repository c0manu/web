window.onload = function () {
    var faqs = $("faqs");
    var h2Elements = faqs.getElementsByTagName("h2");
    		    
    var h2Node;
    for (var i = 0; i < h2Elements.length; i++ ) {
    	h2Node = h2Elements[i];
    	
    	// Attach event handler
    	h2Node.onclick = function () {
			var h2 = this;         // h2 is the current headingNode object
			if (h2.hasAttribute("class")) {
				h2.removeAttribute("class");	
			}
			else {
				h2.setAttribute("class", "minus");
			}
			if (h2.nextElementSibling.hasAttribute("class")) {
				h2.nextElementSibling.removeAttribute("class");
			}
			else {
				h2.nextElementSibling.setAttribute("class", "open");
			}
		}
    }
    $("first_link").focus();
}
var $ = function (id) {
	return document.getElementById(id);
}