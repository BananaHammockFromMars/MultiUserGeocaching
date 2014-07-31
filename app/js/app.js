define(['jquery',
		'underscore',
		'backbone',
		'marionette'],
	function($, _, Backbone, Marionette){
	var KitschyCache = new Marionette.Application();
		KitschyCache.addRegions({
			mapRegion:"#map-region",
			controlRegion:"#control-region"
		});

		KitschyCache.navigate = function(route, options){
			options || (options = {});
			Backbone.history.navigate(route, options);
		};

		KitschyCache.getCurrentRoute = function(){
			return Backbone.history.fragment
		};

		KitschyCache.on('initialize:after', function(){
			require([
				'apps/MapDirections/map_app',
				'apps/MapDirections/mapModel',
				'apps/MapDirections/map_controller',
				'apps/MapDirections/FirstRoute'
			],
			function(){
				if(Backbone.history) {
					Backbone.history.start();
					if(KitschyCache.getCurrentRoute() === "") {
						//*****might not be a thing*****
						KitschyCache.trigger('map:first');
					}
				}
			});
		});

		return KitschyCache;
	})