console.log('trending');

$(document).ready(function(){

  $.get('/trending', function(duplicates){
    // console.log(duplicates);

  }).done(function(duplicates){
    console.log(duplicates);
  }) 

});//end of document.ready
