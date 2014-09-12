function shaltThouPass(){
  var YeShallPass = prompt("What's the password?");
  if(YeShallPass == destinations[currentContext].password){
    refreshContext();
  }
  $('.finder').toggleClass('hidden');
}

function stopTheCar(){
  var walkSpot = new google.maps.LatLng(destinations[currentContext].walk.lat, destinations[currentContext].walk.lng);
  marksTheSpot = new google.maps.Marker({position: walkSpot, map: map});
  directionsDisplay.setMap();
  $('.finder, #oops').toggleClass('hidden');
}

function oops(){
  marksTheSpot.setMap();
  requestDisplayRoute();
  $('.finder, #oops').toggleClass('hidden');
}

function showDirections(){
  $('#panel').animate({'height': '90%'}, 1000);
  $('.directions').toggleClass('hidden');
}

function hideDirections(){
  $('#panel').animate({'height': '0'}, 1000);
  $('.directions').toggleClass('hidden');
}

function showPersonalNotes(){
  $('#personalPanel').animate({'width': '100%'}, 1000);
  $('.details').toggleClass('hidden');
}
function hidePersonalNotes(){
  $('#personalPanel').animate({'width': '0'}, 1000);
  $('.details').toggleClass('hidden');
}

function loadDirectionRender(){
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('panel'));
}

function requestDisplayRoute(){
  var request = { origin: previousDestinationCoords, destination: currentDestinationCoords, travelMode: google.maps.DirectionsTravelMode.DRIVING };
  
  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setMap(map);
      directionsDisplay.setDirections(response);
    }
  });
}

function refreshContext(){
  previousDestinationCoords = currentDestinationCoords;
  currentContext++;
  currentDestinationCoords = new google.maps.LatLng(destinations[currentContext]["drive"]["lat"], destinations[currentContext]["drive"]["lng"]);
  requestDisplayRoute();
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

function handleNoGeolocation(errorFlag){
  if(errorFlag){
    var content = 'Error: Geodude is still a-sleeping.'
  } else {
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