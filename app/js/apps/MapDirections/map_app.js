define(['app'], function(KitschyCache){

	KitschyCache.module('MapApp', function(MapApp, KitschyCache, Backbone, Marionette, $, _){

		KitschyCache.Router = Marionette.AppRouter.extend({
			appRoutes: {
				'map':'openMap'
			}
		});

		var API = {
			openMap: function(){
				MapApp.Controller.renderMap();
			}
		};

		KitschyCache.on('map:first', function(){
			KitschyCache.navigate('map');
		});

		KitschyCache.addInitializer(function(){
			new KitschyCache.Router({
				controller: API
			});
		});

	});

})