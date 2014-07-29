define([
  'app'
], function(Omnibox){

Omnibox.module("Entities", function(Entities, Omnibox, Backbone, Marionette, $, _){
  
  Entities.Channel = Backbone.Model.extend({
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
      category: 'default',
      catalogInfo: 'default',
      tmsId: 'default',
      schedule: 'default',
      disabled: false
    },
    urlRoot: 'https://api.myomnibox.com/v1/streams'
  });

  Entities.VODChannelCollection = Backbone.Collection.extend({
    model: Entities.Channel,
    url: 'https://api.myomnibox.com/v1/streams?{%22catalogType%22:%22show%22,%22$fields%22:{%22catalogInfo%22:0}}',
    comparator: "title"
  });

  Entities.LiveChannelCollection = Backbone.Collection.extend({
    model: Entities.Channel,
    url: 'https://api.myomnibox.com/v1/streams?{%22catalogType%22:%22live%22}',
    comparator: "title"
  });

  var channels;

  var initializeChannels = function() {
    channels = new Entities.ChannelCollection([
      {
        title: "Bob",
        description: "Brigham",
        id: "555-0163"
      }
    ]);
  };
  var API = {
    getChannelEntities: function() {
      channels = new Entities.ChannelCollection();

      return channels;
    },

    getVODChannelEntities: function() {
      channels = new Entities.VODChannelCollection();

      return channels;
    },

    getLiveChannelEntities: function() {
      channels = new Entities.LiveChannelCollection();

      return channels;
    },

    getChannelEntity: function(channelId) {
      //console.log(Omnibox);
      var channel = new Entities.Channel({id: channelId});
      var defer = $.Deferred();
      channel.fetch({
        success: function(data){
          defer.resolve(data);
        },
        error: function(data){
          defer.resolve(undefined);
        }
      })

      return defer.promise();
    }
  };

  Omnibox.reqres.setHandler('channel:liveentities', function() {
    return API.getLiveChannelEntities();
  });

  Omnibox.reqres.setHandler('channel:vodentities', function() {
    return API.getVODChannelEntities();
  });

  Omnibox.reqres.setHandler('channel:entities', function() {
    return API.getChannelEntities();
  });

  Omnibox.reqres.setHandler('channel:entity', function(id) {
    //console.log('return api ' + id);
    return API.getChannelEntity(id);
  });

});


});
