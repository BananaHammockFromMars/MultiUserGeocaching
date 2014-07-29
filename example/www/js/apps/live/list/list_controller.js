define([
  'app'
], function(Omnibox){

Omnibox.module('LiveApp.List', function(List, Omnibox, Backbone, Marionette, $, _) {

  List.Controller = {
    listChannels: function() {
      
      $('nav li.active').removeClass('active');
      $('nav a.live').parent('li').addClass('active');
      var channels = Omnibox.request('channel:liveentities');

      var channelListView = new Omnibox.LiveApp.List.Channel({
        collection: channels
      });

      channelListView.on('channel:play', function(childView, model) {
        Omnibox.LiveApp.Play.Controller.playChannel(childView);
      });
      channelListView.on('channel:default', function(childView, model) {
        Omnibox.LiveApp.Play.Controller.showDefault(childView);
      });
      channelListView.on('channel:show', function(childView, model) {
        Omnibox.LiveApp.Play.Controller.showChannel(childView);
      });
      Omnibox.channellistRegion.show(channelListView);

    },
    listCategories: function() {

      var categories = Omnibox.request('category:liveentities');

      var categoriesListView = new Omnibox.LiveApp.List.Categories({
        collection: categories
      });

      var categoriesLiveTitles = new Omnibox.LiveApp.List.Categories({
        collection: categories
      });
      Omnibox.subnavRegion.show(categoriesLiveTitles);
      Omnibox.sidebarRegion.show(categoriesListView);
    }
  }

});

});