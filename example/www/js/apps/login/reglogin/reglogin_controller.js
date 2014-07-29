define([
  'app'
], function(Omnibox){

Omnibox.module('LoginApp.RegLogin', function(RegLogin, Omnibox, Backbone, Marionette, $, _) {

  RegLogin.Controller = {
    showForm: function() {
       currentToken = localStorage.getItem('currentToken');
       if( currentToken != null){
           dpd.devices.get({"deviceID":device.uuid,"currentToken":currentToken}, function (deviceResult) {
               if(deviceResult != null && deviceResult.length){
                 Omnibox.trigger('loginSuccess');
               }
               else{
                   //TODO make sure if API fails we still get a login
                   var loginView = new Omnibox.LoginApp.RegLogin.LoginView();
                   Omnibox.overlayRegion.show(loginView);
               }
            });
       }
        else{
           //TODO make sure if API fails we still get a login
           var loginView = new Omnibox.LoginApp.RegLogin.LoginView();
           Omnibox.overlayRegion.show(loginView);
           $('#reg-form').validate({
               rules: {
                   "password2": {
                       equalTo: "#password"
                   }
               },
               messages: {
                   required: "Required",
                   "equalto": "Passwords must match."
               }
           });
       }
    },
    showSubscriptions: function(){
      var subscriptions = Omnibox.request('subscription:productentity');
      var subscriptionListView = new Omnibox.LoginApp.RegLogin.Subscriptions({
        collection: subscriptions
      });
      Omnibox.overlayRegion.show(subscriptionListView);
    },
    showSubscribe: function(){
        var subscribeView = new Omnibox.LoginApp.RegLogin.SubscribeView();
        Omnibox.overlayRegion.show(subscribeView);
        $('#subscribe-form').validate();

    }
  }
});

});