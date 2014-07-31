define([
  'app'
], function(Omnibox){

Omnibox.module('VODApp.Play', function(Play, Omnibox, Backbone, Marionette, $, _){

  Play.Channel = Marionette.ItemView.extend({
    template: '#tpl-play-channel',
    events: {
      'click .play': "playVideo",
    },
    /*playVideo: function() {
      console.log('i worked');
      if ($('#audio-player').length > 0) {
        console.log('audio player exists');
        if ($('#audio-player')[0].paused == false){
          console.log('audio player is not paused (should be now)');
          $('#audio-player')[0].pause();
          $('.play').removeClass('pause-audio').addClass('play-audio');
        }
      }
      else {
        $('.live-video')[0].play();
        //$('.play').removeClass('play-audio').addClass('pause-audio');
      }*/
      
      /*setTimeout(function() {
        thisvideo.trigger("channel:play", thisvideo.model);
      }, 30000);*/
    });

});

});