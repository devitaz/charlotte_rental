function showDescription() {
	var x = document.getElementById("hidden-description");
    x.style.display = "block";
	
	var y = document.getElementById("hide-description");
    y.style.display = "inline";

	var z = document.getElementById("more-description");
    z.style.display = "none";
}
function hideDescription() {
	var x = document.getElementById("hidden-description");
    x.style.display = "none";

	var y = document.getElementById("hide-description");
    y.style.display = "none";
	
	var z = document.getElementById("more-description");
    z.style.display = "inline";
}
function showAmenities() {
	var x = document.getElementsByClassName("hidden-tr");
    for(var i = 0; i < x.length; ++i) {
        x[i].style.display = "table-row";
	}
	var y = document.getElementById("hide-amenities");
    y.style.display = "inline";

	var z = document.getElementById("more-amenities");
    z.style.display = "none";
}
function hideAmenities() {
	var x = document.getElementsByClassName("hidden-tr");
    for(var i = 0; i < x.length; ++i) {
        x[i].style.display = "none";
	}
	var y = document.getElementById("hide-amenities");
    y.style.display = "none";
	
	var z = document.getElementById("more-amenities");
    z.style.display = "inline";
}
function showCancellation() {
	var x = document.getElementById("cancel-list");
    x.style.display = "block";
	
	var y = document.getElementById("hide-cancellation");
    y.style.display = "inline";

	var z = document.getElementById("more-cancellation");
    z.style.display = "none";
}
function hideCancellation() {
	var x = document.getElementById("cancel-list");
    x.style.display = "none";
	
	var y = document.getElementById("hide-cancellation");
    y.style.display = "none";

	var z = document.getElementById("more-cancellation");
    z.style.display = "inline";
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
	
	document.getElementById ("more-description").addEventListener ("click", showDescription, false);
	document.getElementById ("hide-description").addEventListener ("click", hideDescription, false);
	document.getElementById ("more-amenities").addEventListener ("click", showAmenities, false);
	document.getElementById ("hide-amenities").addEventListener ("click", hideAmenities, false);
	document.getElementById ("more-cancellation").addEventListener ("click", showCancellation, false);
	document.getElementById ("hide-cancellation").addEventListener ("click", hideCancellation, false);
});