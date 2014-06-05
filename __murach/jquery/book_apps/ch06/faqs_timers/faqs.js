var $ = function (id) {
	return document.getElementById(id);
}
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
    
	// The function for the one-time timer   
    var hideMessage = function() {
	   	$("startup_message").setAttribute("class", "closed");
	   	clearTimeout(timer1);
	}
	// The function for the interval timer
	var counter = 0;
	var updateCounter = function() {
	    counter++;
	    document.getElementById("counter").firstChild.nodeValue = counter;
	}
	var timer1, timer2;
    timer1 = setTimeout(hideMessage, 5000);         // calling one-time function
    timer2 = setInterval( updateCounter, 1000 );    // calling the interval function
	/* 
    // With the one-time timer embedded as the first parameter
    var timer = setTimeout( 
    	function () {
    		$("startup_message").setAttribute("class", "closed");
    		clearTimeout(timer);
    	},
    	5000 );
    */
}
