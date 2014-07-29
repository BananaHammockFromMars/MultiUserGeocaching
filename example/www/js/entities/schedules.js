define([
  'app'
], function(Omnibox){

Omnibox.module("Entities", function(Entities, Omnibox, Backbone, Marionette, $, _){
  
  Entities.Schedule = Backbone.Model.extend({
    defaults: {
      id: 'default',
      tmsId: 'default',
      schedule: 'default'
    },
    urlRoot: 'https://api.myomnibox.com/v1/schedules'
  });

  Entities.SchedulesCollection = Backbone.Collection.extend({
    model: Entities.Schedule,
    //url: 'https://api.myomnibox.com/v1/streams?{%22catalogType%22:%22show%22}',
    url: 'https://api.myomnibox.com/v1/schedules',
    comparator: "tsmId"
  });


  var schedules;

  var initializeChannels = function() {
    schedules = new Entities.SchedulesCollection([
      {
        id: 'default',
        tmsId: 'default',
        schedule: 'default'
      }
    ]);
  };
  var API = {
    getScheduleEntities: function() {
      schedules = new Entities.SchedulesCollection();

      return schedules;
    }
  };

  Omnibox.reqres.setHandler('schedules:schedule', function() {
    return API.getScheduleEntities();
  });


});


});
