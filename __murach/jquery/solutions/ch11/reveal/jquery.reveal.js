(function($){
	$.fn.reveal = function() {
		return this.each(function() {
			$(this).next().hide();
			$(this).toggle(
		    	function() {
					$(this).toggleClass("minus");
		    		$(this).next().slideDown(500);
	    		},
	    		function() {
	        		$(this).toggleClass("minus");
	        		$(this).next().slideUp(500);
	    		}
    		); // end toggle   
		});	
	}
})(jQuery);
