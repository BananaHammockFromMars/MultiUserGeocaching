define([
  'app'
], function(Omnibox){

Omnibox.module("Entities", function(Entities, Omnibox, Backbone, Marionette, $, _){


  Entities.Subscription = Backbone.Model.extend({
    defaults: {
      product: 'default'
    },
  });

  Entities.subscriptionProductsCollection = Backbone.Collection.extend({
    model: Entities.Subscription,
    url: "https://cJixpEeADBmDltYDDqDq:x@omniboxtv.chargify.com/products.json",
  });

  var subscriptions;

  var initializesubscriptions = function() {
    subscriptions = new Entities.subscriptionCollection(
      {
        component: "default",
      }
    );
  };

  var API = {
    getsubscriptionEntities: function() {
      subscriptions = new Entities.subscriptionCollection();
      return subscriptions;
    },
    getsubscriptionProductsEntities: function() {
      subscriptionProducts = new Entities.subscriptionProductsCollection();
      return subscriptionProducts;
    }
  };


  Omnibox.reqres.setHandler('subscription:entity', function() {
    return API.getsubscriptionEntities();
  });
  Omnibox.reqres.setHandler('subscription:productentity', function() {
    return API.getsubscriptionProductsEntities();
  });



  });


});