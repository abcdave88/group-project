//Define all variables
var autocomplete;
var infowindow = new google.maps.InfoWindow(); 
var marker = new google.maps.Marker({
  map: map,
  anchorPoint: new google.maps.Point(0, -29)
});

function updateMapBounds(autocomplete){
  google.maps.event.addListener(autocomplete, 'place_changed', function(){
    infowindow.close();
    // marker.setVisible(false);
    var place = autocomplete.getPlace();
    console.log(place)
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
    var myLatlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
    });
    // marker.setVisible(true);

    // var address = '';
    // if (place.address_components) {
    //   address = [
    //     (place.address_components[0] && place.address_components[0].short_name || ''),
    //     (place.address_components[1] && place.address_components[1].short_name || ''),
    //     (place.address_components[2] && place.address_components[2].short_name || '')
    //   ].join(' ');
    // }

    // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    // infowindow.open(map, marker);
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

  // var infowindow = new google.maps.InfoWindow();
  // //needs to ba a array of markers
  // var marker = new google.maps.Marker({
  //   map: map,
  //   //when commented out map size changes
  //   position: latlng
  // });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  // function setupClickListener(id, types) {
  //   var radioButton = document.getElementById(id);
  //   google.maps.event.addDomListener(radioButton, 'click', function() {
  //     autocomplete.setTypes(types);
  //   });
  // }
///tap will on click show options
  // setupClickListener('changetype-all', []);
  // setupClickListener('changetype-address', ['address']);
  // setupClickListener('changetype-establishment', ['establishment']);
  // setupClickListener('changetype-geocode', ['geocode']);
}

$(document).ready(function(){
  google.maps.event.addDomListener(window, 'load', initialize);
})
