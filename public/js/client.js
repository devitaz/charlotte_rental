"use strict";

function inputValidation(name, phone, message) {
	var error = "";
	if(name.length < 1)
		error += "&#9642; The name field cannot be empty.<br>"; 
	if(/^[a-zA-Z]+$/.test(name))
		error += "&#9642; Name must only contain letters.<br>"; 

	if(phone.length < 1)
		error += "&#9642; The phone field cannot be empty.<br>";
	else if(phone.replace(/[^0-9]/g,"").length != 10)
		error += "&#9642; Phone number must contain 10 numbers.<br>";
	if(message.length < 1)
		error += "&#9642; The message field cannot be empty.<br>";
	
	if(error === "") 
		return true;
	else {
		error += "&nbsp;&nbsp;&nbsp;<b>Please, try again</b>";
		displayMessage("warning", error);
		return false;
	}
}
function displayMessage(type, msg) {
	document.getElementById("success").style.display = "none";
	document.getElementById("info").style.display = "none";
	document.getElementById("warning").style.display = "none";
	document.getElementById("error").style.display = "none";
	document.getElementById("content").style.paddingTop = "4rem";
	
	if(type === "success") {
		document.getElementById("success").style.display = "block";
		document.getElementById("success-msg").innerHTML = msg;
	}
	else if(type === "info") {
		document.getElementById("info").style.display = "block";
		document.getElementById("info-msg").innerHTML = msg;
	}
	else if(type === "warning") {
		document.getElementById("warning").style.display = "block";
		document.getElementById("warning-msg").innerHTML = msg;
	}
	else if(type === "error") {
		document.getElementById("error").style.display = "block";
		document.getElementById("error-msg").innerHTML = msg;
	}	
}

$(document).ready(function() {  
	$("#owl-demo").owlCarousel({
        slideSpeed : 300,
        autoPlay : true,
        navigation : false,
        pagination : false,
        singleItem:true
    });
    $("#owl-demo2").owlCarousel({
        slideSpeed : 300,
        autoPlay : true,
        navigation : false,
        pagination : true,
        singleItem:true
    });
	
	$("#send").click( function() { 
		var name = $("#name").val();
		var phone = $("#phone").val();
        var msg = $("#message").val();

		if(inputValidation(name, phone, msg)) {
			$.ajax({
				type: "POST",
				url: "/contact",
				async: false,
				data: {
					name: name,
					phone: phone,
					msg: msg
				},
				success: function(data) {
					if(data == "sent") {
						displayMessage("success", "Email has successfully been sent to the property owner. Expect a response soon!");
					}
					else {
						displayMessage("error", "SMPP Error: failure to send message. Try a different contact method.");
					}
				},
				error: function(jqXHR, textStatus, err) {
					displayMessage("error", "Server Error: failure to post data to server.");
				}
			});
		}
		else {
			return false;
		}
    });
});	

    






