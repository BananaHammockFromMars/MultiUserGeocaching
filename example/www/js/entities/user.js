define([
  'app'
], function(Omnibox){

Omnibox.module("Entities", function(Entities, Omnibox, Backbone, Marionette, $, _){
  
  Entities.User = Backbone.Model.extend({
    defaults: {
      id: 'default',
      username: 'default',
      role: 'default'
    },
    urlRoot: 'https://api.myomnibox.com/v1/users'
  });


  var API = {
    getUserEntity: function(userId) {
      var user = new Entities.User({id: userId});

      return user;
    }
  };

  Omnibox.reqres.setHandler('user:entity', function() {
    return API.getUserEntity();
  });

});


});
