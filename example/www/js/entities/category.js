define([
  'app'
], function(Omnibox){

Omnibox.module("Entities", function(Entities, Omnibox, Backbone, Marionette, $, _){
  
  Entities.Category = Backbone.Model.extend({
    defaults: {
      id: 'default',
      title: 'default',
      categories: 'default',
      type: 'default',
      machineName: 'default'
      //coverImage: 'default'
    },
    urlRoot: 'https://api.myomnibox.com/v1/packages'
  });

  Entities.LiveCategoryCollection = Backbone.Collection.extend({
    model: Entities.Category,
    url: 'https://api.myomnibox.com/v1/packages?{"type":"live"}'
  });

  Entities.VODCategoryCollection = Backbone.Collection.extend({
    model: Entities.Category,
    url: 'https://api.myomnibox.com/v1/packages?{"type":"vod"}'
  });

  var categories;

  var initializeCategories = function() {
    categories = new Entities.CategoryCollection([
      {
        title: "Basic",
        type: 'default'
      }
    ]);
  };
  var API = {
    getLiveCategoryEntities: function() {
      categories = new Entities.LiveCategoryCollection();

      return categories;
    },
    getVODCategoryEntities: function() {
      categories = new Entities.VODCategoryCollection();

      return categories;
    },
  };

  Omnibox.reqres.setHandler('category:liveentities', function() {
    return API.getLiveCategoryEntities();
  });
  Omnibox.reqres.setHandler('category:vodentities', function() {
    return API.getVODCategoryEntities();
  });

});


});
