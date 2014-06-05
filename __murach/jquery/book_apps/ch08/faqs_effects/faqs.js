$(document).ready(function() {
	// the toggle event method has been removed from jQuery 1.9
	/*
	$("#faqs h2").toggle(
		function() {
			$(this).toggleClass("minus");
		    $(this).next().slideDown(1000);
	    },
	    function() {
	        $(this).toggleClass("minus");
	        $(this).next().slideUp(1000);
	    }
    ); // end toggle
	*/
	
	// here's one way to code this app without the toggle event method
	// but this is by no means the only way
	$("#faqs h2").click(
		function() {
			$(this).toggleClass("minus");
		    $(this).next().slideToggle(1000);
	    }
    ); // end click
    
}); // end ready
