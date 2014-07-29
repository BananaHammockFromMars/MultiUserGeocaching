define([
  'app'
], function(Omnibox){

Omnibox.module('VODApp.Program', function(Program, Omnibox, Backbone, Marionette, $, _){
  
  Program.Show = Marionette.ItemView.extend({
    template: '#tpl-vod-individual-channel',
    events: {
      'click .play-episode': "playProgram",
      'click .button.watch': "playVideo"
    },
    playProgram: function(id) {
      id.preventDefault();
      currentClass = id.target.className;
      currentClass = currentClass.split(" ");
      currentClass = currentClass[1];

      if (currentClass == 'audio'){
        $("body #audio-player").remove();
        var mediaPlayer = '<audio id="audio-player" controls><source src="' + id.target.href + '"</audio>';
        $(".video-info").append(mediaPlayer);
        curVideo = document.getElementById('audio-player');
        $(curVideo)[0].play();
        $('.select-episode.button').addClass('hidden');
        $('.play.button').removeClass('hidden').addClass('pause-audio');

      }
      else if (currentClass == 'video'){
        $("body #vid").remove();
        $("body #audio-player").remove();
        video = "<video id='vid' width='5px' height='5px' src='" + id.target.href + "' ></video>";
        $(".hidden-video").append(video);
        $('.select-episode.button').removeClass('hidden');
        $('.play.button').addClass('hidden');
        curVideo = document.getElementById('vid');
        $(curVideo)[0].play();
      }
      else {
        console.log('you have no class');
      }
    },
    playVideo: function() {
      console.log('i worked');
      if ($('#audio-player').length > 0) {
        console.log('audio player exists');
        if ($('#audio-player')[0].paused == false){
          console.log('audio player is not paused (should be now)');
          $('#audio-player')[0].pause();
          $('.play').removeClass('pause-audio').addClass('play-audio');
        }
        else {
          console.log('we are going to play it now');
          $('#audio-player')[0].play();
          $('.play').removeClass('play-audio').addClass('pause-audio');
        }
      }
      else if ($('#vid.single-video').length > 0) {
        curVideo = document.getElementById('vid');
        $(curVideo)[0].play();
      }
    }
  });

  Program.ShowCollection = Marionette.CollectionView.extend({
    tagName: 'section',
    className: 'program-container',
    itemView: Program.Show,
    initialize: function(id) {
      console.log(id);
      this.collection = new Omnibox.Entities.Channel(id);
      this.collection.fetch({reset:true});
      this.listenTo(this.collection, 'reset', this.render);
    }
  });

});


});
