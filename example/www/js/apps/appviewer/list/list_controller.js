define([
  'app'
], function(Omnibox){

Omnibox.module('AppViewerApp.List', function(List, Omnibox, Backbone, Marionette, $, _) {

  List.Controller = {
    listApps: function() {
      Omnibox.headerRegion.reset();
      Omnibox.subnavRegion.reset();
      Omnibox.sidebarRegion.reset();
      Omnibox.channellistRegion.reset();


      var apps = Omnibox.request('app:appentities');
      var appListView = new Omnibox.AppViewerApp.List.App({
        collection: apps
      });

      Omnibox.headerRegion.show(appListView);

    }

  }

});

});