// submit contact form
$(document).ready(function() { 
    $("#contactForm").bind("submit", function() { 
        $.ajax({ 
            type	: "POST", 
            cache	: false, 
            url		: "<COPIED_CURRENT_WEB_APP_URL>", 
            data	: $(this).serializeArray(), 
            success: function (data) {
				// If 200 OK
				alert("Success..")
		   },
		   error: function (xhr, text, error) {
				// If 40x or 50x; errors
				alert("Failed. Try after some time..")
		   }
        });
        return false;
    });
});