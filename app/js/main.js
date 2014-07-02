require.config({
    paths: {
        "backbone": "libs/backbone/backbone",
        "jquery":  "libs/jquery/dist/jquery",
        "json2": "libs/json2/json2",
        "marionette": "libs/marionette/lib/backbone.marionette",
        "underscore": "libs/underscore/underscore"
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore", "json2"],
            exports: "Backbone"
        },
        jquery: {
            exports: "jQuery"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        }
    }
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(["marionette", 'app'], function(marionette,KitschyCache){

    /* javscript thigns go here */

});
