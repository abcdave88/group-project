var exploreMarkers = [];


$(document).ready(function() {  

function exploreMap() {
	console.log("exploreMap");
		$.get('/locations', function(locations){
			console.log(locations, "this is locations");
		}).done(function(locations){
			console.log(locations, "this is after .done");
		for (i = 0; i < locations.length; i++) {
        var exploreMarker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
          icon: "./assets/images/yellow-marker.png",
          map: map
        });
     	exploreMarkers.push(exploreMarker);
      google.maps.event.addDomListener(window, 'load', initialize);
    }
		})
}

$('.fa-search').on('click', exploreMap);

});