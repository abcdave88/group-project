$(document).ready(function() {  

function addTrip() {
	console.log('addTrip');
	$("#left-pop-out").css('visibility','visible');
}

function contactMenu() {
	console.log('contactMenu');
}

$('.fa-plus').on('click', addTrip);

$('.fa-pencil').on('click', contactMenu);

});