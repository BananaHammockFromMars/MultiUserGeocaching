define([
  'app'
], function(Omnibox){

  Omnibox.module('AppViewerApp.List', function(List, Omnibox, Backbone, Marionette, $, _){

    List.App = Marionette.ItemView.extend({
      tagName: 'div',
      className: 'app inline-block',
      template: '#tpl-apps',
      events: {
        'click a': "openApp"
      },
      playChannel: function(e) {
        e.preventDefault();
      },
      initialize: function() {
        this.collection.fetch({remove:false});
        this.listenTo(this.collection, 'add', this.render);
      }
    });
  });
});
