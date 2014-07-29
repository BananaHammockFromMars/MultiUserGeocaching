define([
  'app'
], function(Omnibox){

Omnibox.module('LoginApp', function(LoginApp, Omnibox, Backbone, Marionette, $, _) {

  LoginApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'login': 'reglogin'
    }
  });

  var API = {
    reglogin: function() {
      LoginApp.RegLogin.Controller.showForm();
    },
    showsubscribe: function(){
      LoginApp.RegLogin.Controller.showSubscribe();
    },
    showSubscriptions: function(){
      LoginApp.RegLogin.Controller.showSubscriptions();
    }
  };

  Omnibox.on('login:reglogin', function() {
    Omnibox.navigate('login');
    API.reglogin();
  });
  Omnibox.on('showSubscribe', function(){
        API.showsubscribe();
  });
  Omnibox.on('showSubscriptions', function(){
    API.showSubscriptions();
  });

  Omnibox.addInitializer(function() {
    new LoginApp.Router({
      controller: API
    });
  });

});

});
