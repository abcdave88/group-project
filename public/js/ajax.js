// console.log('this works');


$(document).ready(function(){
  // console.log('this works');
  $.get('/test', function(places){
    // console.log(places);
    }).done(function(places){
      console.log(places, "this is places after .done");
      var locations = [];
      var infowindow = new google.maps.InfoWindow();
      var i;
      $.each(places, function(index, place) {
        console.log(place, "this is place");
        var three = '';
        
        place.three_things.forEach(function(e,i){
          console.log('forEach is running');
         three += e.text
        });
        var lat = place.lat;
        var lng = place.lng;
        var placeInfo = [three, lat, lng];
        locations.push(placeInfo);
        console.log(locations, "this is locations");
      })
      for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    })
})

