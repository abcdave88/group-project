$(document).ready(function() {  

function addTrip() {
	console.log('addTrip');
	$("#left-pop-out").toggle();
	$('#left-pop-out').addClass('animated slideInLeft');
	// $('#left-pop-out').addClass('animated slideOutLeft');
}

function loginMenu() {
	console.log('loginMenu');
	$("#login-pop-out").toggle();
	$("#login-pop-out").addClass('animated slideInLeft');
}

function signUpMenu() {
	console.log('signUpMenu');
	$("#sign-up-pop-out").toggle();
	$("#sign-up-pop-out").addClass('animated slideInLeft');
}

function contactMenu() {
	console.log('contactMenu');
}

$('.fa-plus').on('click', addTrip);

$('.fa-pencil').on('click', contactMenu);

$('.sign-up-link').on('click', signUpMenu);

$('.login-link').on('click', loginMenu);

});