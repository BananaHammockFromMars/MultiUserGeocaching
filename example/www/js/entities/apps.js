define([
  'app'
], function(Omnibox){

  Omnibox.module("Entities", function(Entities, Omnibox, Backbone, Marionette, $, _){


    Entities.App = Backbone.Model.extend({
      defaults: {
        package: 'default',
        uri: 'default',
        path: 'default',
        name: 'default',
        id: 'default'
      },
      idAttribute: 'package'
    });

    Entities.AppCollection = Backbone.Collection.extend({
      model: Entities.App,
      comparator: "name",
      url: "https://api.myomnibox.com/v1/apps"
    });

    var apps;

    var initializeApps = function() {
      apps = new Entities.AppCollection(
          //pullApps()
      );
    };

    var API = {
      getAppEntities: function() {
        apps = new Entities.AppCollection(
            pullApps()
        );
        return apps;
      },
      getDownloadAppEntities: function() {
        apps = new Entities.AppCollection();
        return apps;
      }
    };


    Omnibox.reqres.setHandler('app:appentities', function() {
      return API.getAppEntities();
    });
    Omnibox.reqres.setHandler('app:appdownloadentities', function() {
      return API.getDownloadAppEntities();
    });

    function pullApps(){
      var pulledApps = [];
      cordova.exec(function(returnVal){
            var appListArray = JSON.parse(returnVal.returnVal);
            pulledApps = appListArray;
          },
          function(returnVal){
            console.log('Failure: ', returnVal);
          },
          'Applist', 'appList', []);
      return pulledApps;
    }

  });


});
