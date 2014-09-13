function shaltThouPass(){
  var YeShallPass = prompt("What's the password?");
  if(YeShallPass.toLowerCase() == destinations[currentContext].password.toLowerCase()){
	  marksTheSpot.setMap();
    if(destinations[currentContext].extra){
      var friend = prompt("Who was there waiting for you?");
      if(friend.toLowerCase() == destinations[currentContext].friend.toLowerCase()){
        marksTheFriend.setMap();
        refreshContext();
    		$('.finder').toggleClass('hidden');
      } else {
        alert("What's that other thing on the map?");
      }
    } else {
      refreshContext();
	  $('.finder').toggleClass('hidden');
    }
  }
}

function stopTheCar(){
  var walkSpot = new google.maps.LatLng(destinations[currentContext].walk.lat, destinations[currentContext].walk.lng);
  marksTheSpot = new google.maps.Marker({position: walkSpot, map: map});
  
  if(destinations[currentContext].extra){
    var friendSpot = new google.maps.LatLng(destinations[currentContext].extra.lat, destinations[currentContext].extra.lng);
    marksTheFriend = new google.maps.Marker({position: friendSpot, map: map});
  }
  
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
  $('#personalPanel').animate({'height': '90%'}, 1500);
  $('.details').toggleClass('hidden');
}
function hidePersonalNotes(){
  $('#personalPanel').animate({'height': '0'}, 1500);
  $('.details').toggleClass('hidden');
}
function transitionNotes(){
  $('#personalPanel').html(destinations[currentContext].personalPanelText.transition);
  showPersonalNotes();
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
  var start = currentcoords;
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