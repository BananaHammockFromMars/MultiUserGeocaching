function initialize(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      previousDestinationCoords = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      requestDisplayRoute();
    });
    
    var marker = new google.maps.Marker({map: map}); 
    navigator.geolocation.watchPosition(function (position) {
      var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      marker.setPosition(coords); 
      }, 
      function(err){ console.log(err); }, 
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 0}
    );
  } else{
    alert("Say Please!");
  }
}

$('#parkedIt').on('click', stopTheCar);
$('#foundIt').on('click', shaltThouPass);
$('#directions').on('click', showDirections);
$('#hideDirections').on('click', hideDirections);
$('#oops').on('click', oops);

var currentContext = 0;

var currentDestinationCoords = 
    new google.maps.LatLng(destinations[currentContext]["drive"]["lat"], destinations[currentContext]["drive"]["lng"]);

var previousDestinationCoords;
var marksTheSpot;

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

var directionsDisplay;
loadDirectionRender();

//var distanceService = new google.maps.DistanceMatrixService();

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
