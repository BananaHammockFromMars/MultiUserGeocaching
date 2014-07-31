define(['app'], 
  function(KitschyCache){
    KitschyCache.module('MapApp', function(MapApp, KitschyCache, Backbone, Marionette, $, _){
    	MapApp.MapModel = Backbone.Model.extend({
    		defaults:{
    			currentPos: function(){},
    			destination: new google.maps.LatLng(38.9758939, -94.48257899999999),
                mapOptions: {
                    zoom: 11,
                    center: this.destination
                },
    			map: new google.maps.Map(this.target, this.mapOptions),
    			password: 'P@ssw0rd1'
    		}
    	});
    });
});