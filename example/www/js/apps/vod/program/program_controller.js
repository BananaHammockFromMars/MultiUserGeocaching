define([
  'app'
], function(Omnibox){

Omnibox.module('VODApp.Program', function(Program, Omnibox, Backbone, Marionette, $, _) {

  Program.Controller = {
    showProgram: function(id, model) {
      if(model != undefined && id.attributes.catalogInfo != 'default'){
          programView = new Program.Show({
              model: model
          });
          Omnibox.headerRegion.show(programView);

          $('.selected').removeClass('selected');
          if ($('#season-container').length > 0){
            if ($('#seson-container').hasClass('multi-season')){
              $('#season-episode-container .seasons-container li:first').addClass('selected');
            }
            else {
              $('#season-episode-container li:first').addClass('selected');
            }
          }
          else {
            $('.play.watch').addClass('selected');
          }
          
      }
      else{
          var fetchingProgram = Omnibox.request('channel:entity', id.id);

          $.when(fetchingProgram).done(function(channel) {
            var programView;
            if (channel !== undefined) {
              programView = new Program.Show({
                model: channel
              });
            }
            else {
              programView = new Program.Show();
              console.log('nothing was found!');
            }

            Omnibox.headerRegion.show(programView);

          $('.selected').removeClass('selected');
          if ($('#season-container').length > 0){
            if ($('#seson-container').hasClass('multi-season')){
              $('#season-episode-container .seasons-container li:first').addClass('selected');
            }
            else {
              $('#season-episode-container li:first').addClass('selected');
            }
          }
          else {
            $('.play.watch').addClass('selected');
          }

          });
      }

    },
    showDefault: function(id, model) {
      if(model != undefined && id.attributes.catalogInfo != 'default'){
          programView = new Program.Show({
              model: model
          });
          Omnibox.headerRegion.show(programView);

          $('.selected').removeClass('selected');
          $('#season-episode-container .seasons-container li:first').addClass('selected');
          console.log($('#season-episode-container .seasons-container li:first').text());
      }
      else{
          var fetchingProgram = Omnibox.request('channel:entity', id.id);

          $.when(fetchingProgram).done(function(channel) {
            var programView;
            if (channel !== undefined) {
              programView = new Program.Show({
                model: channel
              });
            }
            else {
              programView = new Program.Show();
              console.log('nothing was found!');
            }

            Omnibox.headerRegion.show(programView);
          });
      }

    }
  }

});

});