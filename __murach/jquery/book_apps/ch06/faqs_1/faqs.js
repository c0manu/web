window.onload = function () {
    var faqs = $("faqs");
    var h2Elements = faqs.getElementsByTagName("h2");
    		    
    var h2Node;
    for (var i = 0; i < h2Elements.length; i++ ) {
    	h2Node = h2Elements[i];
    	
    	// Attach event handler
    	h2Node.onclick = function () {
    		
    		var h2 = this;         // h2 is the current h2Node object
    		
    		if (h2.getAttribute("class") == "plus") {
    			h2.setAttribute("class", "minus");	
    		}
    		else {
    			h2.setAttribute("class", "plus");
    		}
    		if (h2.nextElementSibling.getAttribute("class") == "closed") {
    			h2.nextElementSibling.setAttribute("class", "open");
    		}
    		else {
    			h2.nextElementSibling.setAttribute("class", "closed");
    		} 
    	}
    }
}
var $ = function (id) {
	return document.getElementById(id);
}