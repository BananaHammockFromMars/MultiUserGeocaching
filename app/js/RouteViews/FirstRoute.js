(function($){
  var Route = Backbone.View.extend({
    el: $("#map-canvas"),
    events: {

    },
  	initialize: function(){
	  	/*var directionsDisplay;
	    var directionsService = new google.maps.DirectionsService();
	    var map;
	    var markMe = null;*/
		  var homeCoords = new google.maps.LatLng(38.9758939, -94.48257899999999);
	    var pigwich = new google.maps.LatLng(39.119405, -94.54945299999997);
	    var vml = new google.maps.LatLng(39.121108, -94.59000700000001);
      //directionsDisplay = new google.maps.DirectionsRenderer();
      var mapOptions = {
        //center: new google.maps.LatLng(38.9758939, -94.48257899999999),
        zoom: 11,
        center: pigwich
      };
      map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var positron = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          //directionsDisplay.setMap(map);
        }, function(){ 
          //handleNoGeolocation(true);
        });
      } else{
      	//handleNoGeolocation(false);
      }
	 }
	});
var route1 = new Route;
})
(jQuery);