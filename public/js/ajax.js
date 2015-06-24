// console.log('this works');

var locations = [];

$(document).ready(function(){
  // console.log('this works');
  $.get('/test', function(places){
    // console.log(places);
    }).done(function(places){
      console.log(places, "done function");
      $.each(places, function(index, place){
        // console.log(place.lat, "our each loop");
        var city = place.city;
        var lat = place.lat;
        var lng = place.lng;
        var locations = [city, lat, lng];
        three = place.three_things.forEach(function(e,i){
          console.log(e.text, e.lat, e.lng);
          var text = e.text
          console.log(text)
        });

        getShow(city, lat, lng);
        function getShow() {
          var infowindow = new google.maps.InfoWindow();

          var myLatlng = new google.maps.LatLng( lat, lng);
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
           
          });

       }
       google.maps.event.addDomListener(window, 'load', getShow);

      })
    })
})



