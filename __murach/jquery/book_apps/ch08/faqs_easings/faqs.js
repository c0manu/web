$(document).ready(function() {
	
	$("#faqs h1").click(function() {
		$(this).animate(
			{ fontSize: "650%", opacity: 1, left: "+=275" }, 2000, "easeInExpo" )  
		.animate( 
			{ fontSize: "175%", left: "-=275" }, 1000, "easeOutExpo" );
	}); // end click
	
	// the toggle event method has been removed from jQuery 1.9
	$("#faqs h2").toggle(
		function() {
			$(this).toggleClass("minus");
		    $(this).next().slideDown(1000, "easeOutBounce");
	    },
	    function() {
	        $(this).toggleClass("minus");
	        $(this).next().slideUp(1000, "easeInBounce");
	    }
    ); // end toggle
	
	// here's one way to code this app without the toggle event method
	// but this is by no means the only way
	/*
	$("#faqs h2").click(function() {
		$(this).toggleClass("minus");
		if ($(this).attr("class") == "minus") {
		   	$(this).next().slideDown(1000, "easeOutBounce");
	   	}
	   	else {
	        $(this).next().slideUp(1000, "easeInBounce");
	   	}
    }); // end click
	*/
}); // end ready
