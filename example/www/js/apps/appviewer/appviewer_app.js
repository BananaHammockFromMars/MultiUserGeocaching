define([
  'app'
], function(Omnibox){

Omnibox.module('AppViewerApp', function(AppViewerApp, Omnibox, Backbone, Marionette, $, _) {

  AppViewerApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'apps': 'showApps'
    }
  });

  var API = {
    showApps: function() {
      console.log('running showApps');
      AppViewerApp.List.Controller.listApps();
      $('nav .selected').removeClass();
      $('nav .active').removeClass('active');
      $('nav .apps').parent().addClass('active');
      $('.selected').removeClass('selected');
    }
  };

  Omnibox.on('app:list', function() {
    Omnibox.navigate('apps');
    API.showApps();
  });

  Omnibox.addInitializer(function() {
    new AppViewerApp.Router({
      controller: API
    });
  });

});


});