$(document).ready(function() {  

function addTrip() {
	console.log('addTrip');
	$("#left-pop-out").toggle();
	$('#left-pop-out').addClass('animated slideInLeft');
	// $('#left-pop-out').addClass('animated slideOutLeft');
}

function contactMenu() {
	console.log('contactMenu');
}

$('.fa-plus').on('click', addTrip);

$('.fa-pencil').on('click', contactMenu);

});