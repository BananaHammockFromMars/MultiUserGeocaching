define([
  'app'
], function(Omnibox){

Omnibox.module('VODApp.Play', function(Play, Omnibox, Backbone, Marionette, $, _) {

  Play.Controller = {
    playChannel: function(model) {
      console.log("playChannel called for model ", model);
      var channelView = new Play.Channel({
        model: model
      });

      //Omnibox.headerRegion.show(channelView);
    }
  }

});

});