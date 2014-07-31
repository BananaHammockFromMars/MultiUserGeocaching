define(['app'], 
  function(KitschyCache){
    KitschyCache.module('MapApp', function(MapApp, KitschyCache, Backbone, Marionette, $, _){
    	
    	MapApp.Controller = {
    		renderMap: function(){
	    		var FirstDestination = new KitschyCache.MapApp.Destination({model: MapModel});
    			KitschyCache.mapRegion.show(FirstDestination);
    		}

    	};

    });

});