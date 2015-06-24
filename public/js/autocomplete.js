
var autocomplete;
var infowindow = new google.maps.InfoWindow(); 
var marker = new google.maps.Marker({
  map: map,
  anchorPoint: new google.maps.Point(0, -29)
});

function updateMapBounds(autocomplete){
  //I am not sure if this is correct...!
  // threeThingsLatLng = [];
  google.maps.event.addListener(autocomplete, 'place_changed', function(){
    infowindow.close();
    // marker.setVisible(false);
    var place = autocomplete.getPlace();
    console.log(place)
    var A = place.geometry.location.A
    var F = place.geometry.location.F

    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    //Pushing into varibale in map.js file
    threeThingsLatLng.push([lat, lng]);
    console.log('threeThingsLatLng', threeThingsLatLng);
    var myLatlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
    });
  
  });
}

function setAutocomplete(){
  var inputs = ["pac-input1", "pac-input2", "pac-input3"];
  $.each(inputs, function(index, input){
    var input = document.getElementById(input);
    console.log(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    updateMapBounds(autocomplete);
  })
}

function initialize() {
  setAutocomplete();
  console.log(map);

 
}

$(document).ready(function(){
  google.maps.event.addDomListener(window, 'load', initialize);
})
