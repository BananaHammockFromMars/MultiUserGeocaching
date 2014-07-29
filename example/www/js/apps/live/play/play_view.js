define([
  'app'
], function(Omnibox){

Omnibox.module('LiveApp.Play', function(Play, Omnibox, Backbone, Marionette, $, _){

  Play.Channel = Marionette.ItemView.extend({
    template: '#tpl-play-channel',
    defaults: {
      id: 'default',
      accessLevel: 'default',
      catalogInfo: 'default',
      catalogType: 'default',
      coverImage: 'default',
      title: 'default',
      description: 'default',
      rating: 'default',
      streamUrl: 'default',
      category: 'default'
    },
    events: {
      'click .play': "playVideo",
      'click .preview-video': "playVideo"
    },
    playVideo: function(e) {
      e.preventDefault();
      if (!$('.video-container').hasClass('disabled')){
        console.log('this is not disabled');
        var item = this;
        if (item.model.attributes.catalogInfo.publisher == 'filmon'){
          getStream(item.model.attributes.catalogInfo.chanNum);
        }
        else if (item.model.attributes.catalogInfo.publisher == 'ustvnow') {
          var item = omniLiveUSTVplay(item.model);
          newurl = item.attributes.streamUrl.primary;
          $("body #vid").remove();
          video = "<video class='ustvnow' id='vid' width='5px' height='5px' src='" + newurl + "' ></video>";
          $(".hidden-video").append(video);
          setTimeout(function(){
              curVideo = document.getElementById('vid');
              $(curVideo)[0].play();
            
          },200);
         

        }
      }
      
    },
  });

});

});