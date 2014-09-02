var destinations = [
  {name:"Cave Spring", lat:38.992703953997214, lng: -94.48306728154415, password:"couch"},
  {name:"Our First Cache", lat:39.002388310700034, lng:-94.30907849307096, password:"sofa"},
  {name:"KCK", lat:39.120304602581776, lng:-94.74909321380426, password:'loveseat'},
  {name:"Anna's Oven", lat:39.05717158898738, lng:-94.60659199669493, password:"diningchair"},
  {name:"H&M", lat:39.0426078528567, lng:-94.59267862831115, password: "rockingchair"},
  {name:"The Final Surprise", lat:39.03108459957071, lng:-94.59306566878661},
  {name: "VML", lat:39.12033729027072, lng: -94.59039379629519, password: "desk" }
];

$('.foundIt').on('click', shaltThouPass);

var currentContext = 0;
var currentDestinationCoords = new google.maps.LatLng(destinations[currentContext]["lat"], destinations[currentContext]["lng"]);
var previousDestinationCoords = new google.maps.LatLng(38.973331816118815, -94.45353863809817);
var mapOptions = {
      zoom: 11, 
      center: currentDestinationCoords, 
      mapTypeControl: true, //allows you to select map type eg. map or satellite
      navigationControlOptions:
       {
         style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
       },
       mapTypeId: google.maps.MapTypeId.HYBRID
     };
var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);
directionsDisplay.setPanel(document.getElementById('panel'));
var distanceService = new google.maps.DistanceMatrixService();
var travelType = google.maps.TravelMode.DRIVING;

function initialize(){
  // if(navigator.geolocation){
  //   directionsDisplay.setMap(map);
  //   calcRoute(previousDestinationCoords, currentDestinationCoords);
  //   checkDistance(previousDestinationCoords, currentDestinationCoords);
  // } else {
  //   handleNoGeolocation(false);
  // }

  if (navigator.geolocation) { 
      navigator.geolocation.watchPosition(function (position) {
      console.log("working");
      var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
      var request = { origin: coords, destination: currentDestinationCoords, travelMode: google.maps.DirectionsTravelMode.DRIVING };

      directionsService.route(request, function (response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);
       }
     });
   }, function(err){ console.log(err); }, {enableHighAccuracy: true, timeout: 2000, maximumAge: 0});
 }
}

google.maps.event.addDomListener(window, 'load', initialize);

//praying together
//concerts
//picnics
//getting rained on
//dog park, farmers market
//fancy dates
//play list & sharing music - dancing together
//singing to you
//having fun with each others' families, grandma, cards and games - being a part of each others' families

/*function initialize(){
  if(navigator.geolocation){
    directionsDisplay.setMap(map);
    navigator.geolocation.watchPosition(watchMe, handleNoGeolocation(true), {enableHighAccuracy: false, timeout: 2000, maximumAge: 0});
  } else {
    handleNoGeolocation(false);
  }
}
*/