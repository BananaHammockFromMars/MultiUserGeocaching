define([
  'app'
], function(Omnibox){

Omnibox.module('VODApp.List', function(List, Omnibox, Backbone, Marionette, $, _) {

  List.Controller = {
    listVodChannels: function() {
      $('nav li.active').removeClass('active');
      $('nav a.vod').parent('li').addClass('active');

      var channels = Omnibox.request('channel:vodentities');

      var channelListView = new Omnibox.VODApp.List.Channel({
        collection: channels
      });

      channelListView.on('vod:showProgram', function(childView, model) {
        Omnibox.VODApp.Program.Controller.showProgram(childView, model);
      });
      channelListView.on('vod:showDefault', function(childView, model) {
        Omnibox.VODApp.Program.Controller.showDefault(childView, model);
      });

      Omnibox.channellistRegion.show(channelListView);
      Omnibox.headerRegion.reset();

    },
    listCategories: function() {
      var categories = Omnibox.request('category:vodentities');

      var categoriesListView = new Omnibox.VODApp.List.Categories({
        collection: categories
      });

      var categoriesVODTitles = new Omnibox.VODApp.List.Categories({
        collection: categories
      });

      Omnibox.subnavRegion.show(categoriesVODTitles);
      Omnibox.sidebarRegion.show(categoriesListView);
    }
  }

});

});