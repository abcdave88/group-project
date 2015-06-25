$(document).ready(function() {  

function addTrip() {
    console.log('addTrip');
    $('#left-pop-out').removeClass('animated slideOutLeft')
    $("#left-pop-out").toggle();
    $('#left-pop-out').addClass('animated slideInLeft');
    // $('#left-pop-out').addClass('animated slideOutLeft');
}

function hideTrip(){
    $('#left-pop-out').removeClass('animated slideInLeft')
    $("#left-pop-out").addClass('animated slideOutLeft');
    setTimeout(function(){$('#left-pop-out').toggle()}, 1000);


}

function loginMenu() {
    console.log('loginMenu');
    $('#login-pop-out').removeClass('animated slideOutLeft')
    $("#login-pop-out").toggle();
    $("#login-pop-out").addClass('animated slideInLeft');
}

function signUpMenu() {
    console.log('signUpMenu');
     $('#sign-up-pop-out').removeClass('animated slideOutLeft')
    $("#sign-up-pop-out").toggle();
    $("#sign-up-pop-out").addClass('animated slideInLeft');
}

function hideLoginMenu() {
    console.log('hideLoginMenu');
    $('#login-pop-out').removeClass('animated slideInLeft')
    $("#login-pop-out").addClass('animated slideOutLeft');
    setTimeout(function(){$('#login-pop-out').toggle()}, 1000);
}

function hideSignUpMenu() {
    console.log('hideLoginMenu');
    $('#sign-up-pop-out').removeClass('animated slideInLeft')
    $("#sign-up-pop-out").addClass('animated slideOutLeft');
    setTimeout(function(){$('#sign-up-pop-out').toggle()}, 1000);
}

function contactMenu() {
    console.log('contactMenu');
}

function showTrending() {
   console.log('trending menu');
    $('#trending-pop-out').removeClass('animated slideOutLeft')
    $("#trending-pop-out").toggle();
    $("#trending-pop-out").addClass('animated slideInLeft');
}

function hideTrending() {
    $('#trending-pop-out').removeClass('animated slideInLeft')
    $("#trending-pop-out").addClass('animated slideOutLeft');
    setTimeout(function(){$('#trending-pop-out').toggle()}, 1000);
}

function hideWelcomeMessage() {
   $('#welcome-div').hide();
}

$('.fa-th-list').on('click', showTrending);

$(".arrow-contain-trend").on('click', hideTrending);

$('.fa-plus').on('click', addTrip);

$('.arrow-contain').on('click', hideTrip);

$('.fa-pencil').on('click', contactMenu);

$('.login-link').on('click', loginMenu);

$('.sign-up-link').on('click', signUpMenu);

$('.arrow-contain-log-in').on('click', hideLoginMenu);

$('.arrow-contain-sign-up').on('click', hideSignUpMenu);

$('.fa-globe').on('click', clearMapThenGetLocation);

$(document).on('click', hideWelcomeMessage);

});