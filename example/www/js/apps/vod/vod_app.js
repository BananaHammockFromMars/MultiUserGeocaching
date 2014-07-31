define([
  'app'
], function(Omnibox){

Omnibox.module('VODApp', function(VODApp, Omnibox, Backbone, Marionette, $, _) {

  VODApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'vod': 'listVodChannels',
      'vod/:id': 'showProgram'
    }
  });

  var API = {
    listVodChannels: function() {
      VODApp.List.Controller.listVodChannels();
      VODApp.List.Controller.listCategories();
      initLiveNavigation();
      $('nav .selected').removeClass();
      $('nav .active').removeClass('active');
      $('nav .vod').parent().addClass('active');
    },

    showProgram: function(id, model) {
      VODApp.Program.Controller.showProgram(id, model);
    }
  };

  Omnibox.on('vod:list', function() {
    Omnibox.navigate('vod');
    API.listVodChannels();
  });

  Omnibox.on('vod:showProgram', function(model) {
    Omnibox.navigate('vod/' + model.get("id"));
    API.showVodProgram(model.get("id"), model);
  });

  Omnibox.addInitializer(function() {
    new VODApp.Router({
      controller: API
    });
  });

});

});