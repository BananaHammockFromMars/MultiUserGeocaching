function shaltThouPass(){
  var YeShallPass = prompt("What's the password?");
  if(YeShallPass == destinations[currentContext].password){
    refreshContext();
  }
}

function showDirections(){
  $('#panel').animate({'height': '100%'}, 2000);
  $('.directions').toggleClass('hidden');
}

function hideDirections(){
  $('#panel').animate({'height': '0'}, 2000);
  $('.directions').toggleClass('hidden');
}

function setPosition(pos){
  var googlePos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    return googlePos;
}

function refreshContext(){
  previousDestinationCoords = currentDestinationCoords;
  currentContext++;
  currentDestinationCoords = new google.maps.LatLng(destinations[currentContext]["lat"], destinations[currentContext]["lng"]);
  travelType = google.maps.TravelMode.DRIVING;
}

function watchMe(pos){
    var googlePos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    return googlePos;
}

function calcRoute(currentcoords, destination){
  //var start = document.getElementById("start").value;
  var start = currentcoords;
  //var end = document.getElementById("end").value;
  var end = destination;

  var request = {
    origin: start, 
    destination: end,
    travelMode: travelType
  };
  directionsService.route(request, function(result, status) {
    if(status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

function checkDistance(start, end){
  distanceService.getDistanceMatrix({
    origins: [start], 
    destinations: [end],
    travelMode: travelType
  }, callbackDistance);
}

function callbackDistance(response, status){
	if(status == "OK"){
		var value = response.rows[0].elements[0].distance.value;
    if(response.rows[0].elements[0].distance.value < 200){
      		travelType = google.maps.TravelMode.WALKING;
          console.log(true + ", " + value);
    	} else {
          travelType = google.maps.TravelMode.DRIVING;
          console.log(false + ", " + value);
      }

	} else {
		console.log("Ye've got issues");
	}
}

function handleNoGeolocation(errorFlag){
  if(errorFlag){
    //gelocations isn't working
    var content = 'Error: Geodude is still a-sleeping.'
  } else {
    //if access to geolocations isn't granted to browser
    var content = 'Error: You hate Geodude.'
  }
  console.log(content);
}



/*function watchMe(){
  var watchSuccess = function(pos){
    var moveMe = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      console.log('Still working...');
    calcRoute(moveMe, currentDestinationCoords);
  };

  var watchError = function(err){
    console.log('And... broken!');
  };

  var watchOptions = {
    enableHighAccuracy: false,
    timeout: 2000,
    maximumAge: 0
  };

  var watchPos = navigator.geolocation.watchPosition(watchSuccess, watchError, watchOptions);
}

function calcRoute(currentcoords, destination){
  //var start = document.getElementById("start").value;
  var start = currentcoords;
  //var end = document.getElementById("end").value;
  var end = currentDestinationCoords;

  checkDistance(start, end);

  var request = {
    origin: start, 
    destination: end,
    travelMode: travelType
  };
  directionsService.route(request, function(result, status) {
    if(status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

function checkDistance(start, end){
  distanceService.getDistanceMatrix({
    origins: [start], 
    destinations: [end],
    travelMode: travelType
  }, callbackDistance);
}

function callbackDistance(response, status){
  if(status == "OK"){
    if(response.rows[0].elements[0].distance.value < 200){
          travelType = google.maps.TravelMode.WALKING;
      } else {
          travelType = google.maps.TravelMode.DRIVING;
      }

  } else {
    console.log("Ye've got issues");
  }
}*/