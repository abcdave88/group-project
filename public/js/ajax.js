function clearMapThenGetLocation(){
  console.log("clearMapThenGetLocation")
  for (var i = 0; i < exploreMarkers.length; i++ ) {
    exploreMarkers[i].setMap(null);
  }
  getLocationInfo();
}

function getLocationInfo(){
  // console.log('this works');
  $.get('/test', function(places){
    // console.log(places);
    }).done(function(user){
      var user_id = user._id;
      var places = user.locations;
      // console.log(places, "this is places after .done");
      var locations = [];
      var infowindow = new google.maps.InfoWindow({
        maxWidth: 250,
        backgroundColor: '#64FE2E'
      })
      var i;
      $.each(places, function(index, place) {
        // console.log(place, "this is place");
        var three =  place.city + '       ' + '<button data-id="' + place._id + '" data-user-id="' + user_id + '" id="delete-button"><h6>DELETE</h6></button>' + "<br>";

        
        place.three_things.forEach(function(e,i){
          // console.log('forEach is running');
         three += e.text + '<br>'
        });
        // var city = place.city;
        var lat = place.lat;
        var lng = place.lng;
        var placeInfo = [three, lat, lng];
        locations.push(placeInfo);
        // console.log(locations, "this is locations");
      })
      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          icon: "./assets/images/red-marker3.png",
          map: map
        });
        console.log(marker, map);
        google.maps.event.addListener(marker, "click", (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
    google.maps.event.addDomListener(window, 'load', initialize);
    })
};

function deleteLocation() {
  console.log("hit");
  var place_id = $(this).data('id');
  var user_id = $(this).data('user-id');
    $.ajax({
      url: '/users/'+ user_id +'/locations/' + place_id,
      type: 'DELETE'
    // console.log('locationId')
    })
    // .done(function(response) {
    //   console.log(response);
    //   $('#blog-ul').empty();
    //   Blog.all();
    // });
  }

$(document).ready(function(){
  $('body').on('click','#delete-button', deleteLocation)

});

