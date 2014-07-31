define([
  'app'
], function(Omnibox){

Omnibox.module('LiveApp.Play', function(Play, Omnibox, Backbone, Marionette, $, _) {

  Play.Controller = {
    playChannel: function(model) {
      var channelView = new Play.Channel({
        model: model
      });

      Omnibox.mainRegion.reset();
      $('#main-region, #ad-region').hide();
      Omnibox.headerRegion.show(channelView);
      if (!$('.video-container').hasClass('disabled')){
        setTimeout(function() {
          curVideo = document.getElementById('vid');
          $(curVideo)[0].play();
        },500);
      } else {
        console.log('disabled');
      };
      
      

    },
    showDefault: function(model) {
      var channelView = new Play.Channel({
        model: model
      });

      $('#main-region, #ad-region').hide();
      Omnibox.headerRegion.show(channelView);
    },
    showChannel: function(model) {
      var channelView = new Play.Channel({
        model: model
      });

      $('#main-region, #ad-region').hide();
      Omnibox.headerRegion.show(channelView);
    }
  }

});

});