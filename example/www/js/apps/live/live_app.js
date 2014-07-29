define([
  'app'
], function(Omnibox){

Omnibox.module('LiveApp', function(LiveApp, Omnibox, Backbone, Marionette, $, _) {

  LiveApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'live': 'liveChannels'
    }
  });

  var API = {
    liveChannels: function() {
      LiveApp.List.Controller.listChannels();
      LiveApp.List.Controller.listCategories();
      initFilmOn();
      initUSTV(omniLiveUSTV);
      initLiveNavigation();
      $('nav .selected').removeClass();
      $('nav .active').removeClass('active');
      $('nav .live').parent().addClass('active');
    },

  };

  Omnibox.on('live:list', function() {
    Omnibox.navigate('live');
    API.liveChannels();
  });

  Omnibox.addInitializer(function() {
    new LiveApp.Router({
      controller: API
    });
  });


});

});