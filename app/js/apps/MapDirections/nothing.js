currentLocation:function(){
	},
	initialize: function(){
	  	var directionsDisplay;
	    var directionsService = new google.maps.DirectionsService();
	    var map;
	    var markMe = null;
		var homeCoords = new google.maps.LatLng(38.9758939, -94.48257899999999);
	    var pigwich = new google.maps.LatLng(39.119405, -94.54945299999997);
	    var vml = new google.maps.LatLng(39.121108, -94.59000700000001);
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptions = {
          //center: new google.maps.LatLng(38.9758939, -94.48257899999999),
          zoom: 11,
          center: pigwich
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(position){
            var positron = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            directionsDisplay.setMap(map);
          }, function(){ 
            handleNoGeolocation(true);
          });
        } else{
        	handleNoGeolocation(false);
        }
    	google.maps.event.addDomListener(window, 'load', watchMe);
	},
    watchMe: function(){
        var watchSuccess = function(pos){
          var moveMe = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
           this.calcRoute(moveMe, pigwich);
        };
        var watchError = function(err){
          console.log('And... broken!');
        };
        var watchOptions = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        var watchPos = navigator.geolocation.watchPosition(watchSuccess, watchError, watchOptions);
      },
      //function for geolocation issues
      handleNoGeolocation: function(errorFlag){
        if(errorFlag){
          //gelocations isn't working
          var content = 'Error: Geodude is still a-sleeping.'
        } else {
          //if access to geolocations isn't granted to browser
          var content = 'Error: You hate Geodude.'
        }
        //pass default coordinates to map if no location permission is granted
        var options = {
          map: map,
          position: new google.maps.LatLng(38.9758939, -94.48257899999999),
          content: content
        }
        //default InfoWindow
        var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
      },
      calcRoute: function(currentcoords, destination){
        //var start = document.getElementById("start").value;
        var start = currentcoords;
        //var end = document.getElementById("end").value;
        var end = destination;

        var request = {
          origin: start, 
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
          if(status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        });
      }
  });