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

function hideLoginMenu() {
    console.log('hideLoginMenu');
    $("#login-pop-out").toggle();
    $("#login-pop-out").addClass('animated slideOutLeft');
}

function hideSignUpMenu() {
    console.log('hideLoginMenu');
    $("#login-pop-out").toggle();
    $("#login-pop-out").addClass('animated slideOutLeft');
}

function contactMenu() {
    console.log('contactMenu');
}

$('.fa-plus').on('click', addTrip);

$('.fa-pencil').on('click', contactMenu);

$('.login-link').on('click', loginMenu);

$('.sign-up-link').on('click', signUpMenu);

$('#login-up-button').on('click', hideLoginMenu);

$('#sign-up-button').on('click', hideSignUpMenu);

$('.fa-globe').on('click', clearMapThenGetLocation);

});