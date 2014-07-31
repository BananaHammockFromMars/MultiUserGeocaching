define([
  'app'
], function(Omnibox){

Omnibox.module('ClockApp', function(ClockApp, Omnibox, Backbone, Marionette, $, _) {

  var API = {
    startClock: function() {
      updateTime();
      setInterval(updateTime, 15000);
      console.log('starting clock');
    },

  };

  Omnibox.on('start:clock', function() {
    API.startClock();
  });

  function updateTime() {
    var t = new Date(),
        h = t.getHours(),
        m = t.getMinutes()
        
    //if (h<10){h='0'+h};
    var ampm = 'AM';
    if (m<10){m='0'+m};
    if (h>12){h-=12;ampm='PM'};
    if (h===0){h='12'};
    
    $('#clock').html(h + ':' + m + ' ' + ampm);
  
  }
});

});