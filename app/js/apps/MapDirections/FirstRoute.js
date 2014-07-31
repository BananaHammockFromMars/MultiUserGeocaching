define(['app'], 
  function(KitschyCache){
    KitschyCache.module('MapApp', function(MapApp, KitschyCache, Backbone, Marionette, $, _){
    MapApp.Destination = Marionette.ItemView.extend({
      className: "map-target",
      events: {

      },
      template: "#map-empty",
    	initialize: function(){
  	  	/*var directionsDisplay;
  	    var directionsService = new google.maps.DirectionsService();
  	    var map;
  	    var markMe = null;*/
  		  this.homeCoords = new google.maps.LatLng(38.9758939, -94.48257899999999);
  	    this.pigwich = new google.maps.LatLng(39.119405, -94.54945299999997);
  	    this.vml = new google.maps.LatLng(39.121108, -94.59000700000001);
        //directionsDisplay = new google.maps.DirectionsRenderer();
        /*var mapOptions = {
          //center: new google.maps.LatLng(38.9758939, -94.48257899999999),
          zoom: 11,
          center: this.pigwich
        };*/
        this.model.get('map'); //= new google.maps.Map(this.$el, mapOptions);
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
  });
});