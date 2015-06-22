$(document).ready(function() {  

function addTrip() {
	console.log('addTrip');
	$("#left-pop-out").css('visibility','visible');
	$('#left-pop-out').addClass('animated slideInLeft');
}

function contactMenu() {
	console.log('contactMenu');
}

$('.fa-plus').on('click', addTrip);

$('.fa-pencil').on('click', contactMenu);

});