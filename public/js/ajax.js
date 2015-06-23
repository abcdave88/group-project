function storeLocation(place){
console.log(place)
  $.post('/places', place)
    .done(function(place){
      console.log(place)
    })
  
}