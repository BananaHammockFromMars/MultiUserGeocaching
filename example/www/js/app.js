define([
  'jquery',
  'underscore',
  'backbone',
  'marionette'
], function($, _, Backbone, Marionette){

  var Omnibox = new Marionette.Application();

  Omnibox.addRegions({
    menuRegion: "#menu-region",
    headerRegion: "#header-region",
    subnavRegion: "#packages-region",
    sidebarRegion: "#sidebar-region",
    mainRegion: "#main-region",
    channellistRegion: "#channel-list-region",
    overlayRegion: "#overlay-region"
  });

 Omnibox.navigate = function(route,  options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  Omnibox.getCurrentRoute = function() {
    return Backbone.history.fragment
  };

  Omnibox.on('initialize:after', function() {
    console.log('Feel the power of the Omnibox!');
    require([
      'common/filmon',
      'common/ustv',
      'common/initNavigation',
      'common/preloadImages',
      'common/backbone-basicauth',
      'common/blurbs',
      'entities/channel',
      'entities/category',
      'entities/apps',
      'entities/subscriptions',
      'apps/live/live_app',
      'apps/live/list/list_view',
      'apps/live/list/list_controller',
      'apps/live/play/play_view',
      'apps/live/play/play_controller',
      'apps/vod/vod_app',
      'apps/vod/list/list_view',
      'apps/vod/list/list_controller',
      'apps/vod/program/program_view',
      'apps/vod/program/program_controller',
      'apps/login/login_app',
      'jquery.validate',
      'apps/login/reglogin/reglogin_controller',
      'apps/login/reglogin/reglogin_view',
      'apps/appviewer/appviewer_app',
      'apps/appviewer/list/list_view',
      'apps/appviewer/list/list_controller',
      'apps/header/header_app'
    ], function() {

      if (Backbone.history) {
        Backbone.history.start(/*pushState: true*/);

        if (Omnibox.getCurrentRoute() === "") {
          Omnibox.trigger('login:reglogin');
        }
        Omnibox.trigger('start:clock');
        preloadImages();
      }



    });
  });
  Omnibox.on('loginSuccess', function(){
    Omnibox.trigger('live:list');
    showBlurbs();
  })

return Omnibox;

});