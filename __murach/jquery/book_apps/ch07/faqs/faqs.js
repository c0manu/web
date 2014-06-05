$(document).ready(function() {
	// the toggle event method has been removed from jQuery 1.9
	$("#faqs h2").toggle(
		function() {
			$(this).toggleClass("minus");
		    $(this).next().show();
	    },
	    function() {
	        $(this).toggleClass("minus");
	        $(this).next().hide();
	    }
    ); // end toggle
	
	// here's one way to code this app without the toggle event method
	// but this is by no means the only way
	/*
	$("#faqs h2").click(function() {
		$(this).toggleClass("minus");
		if ($(this).attr("class") != "minus") {
		   	$(this).next().hide();
	   	}
	   	else {
	        $(this).next().show();
	   	}
    }); // end click
	*/
}); // end ready
