$(document).ready(function() {
	// the call to the plugin method
	$("h1").displaySelection().css("color", "red");
	 
	// setting up the click event handler for the h2 elements
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
}); // end ready
