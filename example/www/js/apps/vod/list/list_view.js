define([
  'app'
], function(Omnibox){

Omnibox.module('VODApp.List', function(List, Omnibox, Backbone, Marionette, $, _){
  
  List.Channel = Marionette.ItemView.extend({
    tagName: 'section',
    className: 'channels-container',
    template: '#tpl-vod-channel',
    events: {
      'focusin .channel-link': "showTitle",
      'focusout .channel-link': "hideTitle",
      'click a': "showProgram"
    },
    showTitle: function() {
      this.$el.find('.title').removeClass('hidden');
    },
    hideTitle: function() {
      this.$el.find('.title').addClass('hidden');
    },
    showProgram: function(e) {
      $('.content-holder').hide();
      e.preventDefault();
      var id = $(e.currentTarget).data("id");
      var item = this.origcollection.get(id);
      $('.selected').addClass('previous-video');
      this.trigger("vod:showProgram", item);
    },
    initialize: function() {
      Omnibox.headerRegion.reset();
      $('<div id="spinner"><div class="inner-spin"></div></div>').appendTo('#header-region');
      var opts = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: "#c6171a", // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: "spinner", // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: "60px", // Top position relative to parent in px
        left: "60px" // Left position relative to parent in px
      };
      $("#spinner .inner-spin").spin(opts);
      this.collection = new Omnibox.Entities.VODChannelCollection();
      this.collection.fetch({reset:true});
      this.listenTo(this.collection, 'reset', function(){
        //console.log(this.collection);
          var packaged = this.collection.groupBy(function(model){
              return model.attributes.accessLevel[0];
          });
          _.each(packaged, function(channels, package){
            packaged[package] = _.groupBy(channels, function(model){
              return model.attributes.category.primary;
            });  
          });
          this.origcollection = this.collection
          
          categories = new Omnibox.Entities.VODCategoryCollection();
          myview = this;
          categories.fetch({
            reset: true,
            success: function(model,response,options) {
              var sortedChannels = {};
              _.each(response, function(package){
                sortedChannels[package.machineName] = {};
                
                _.each(package.categories, function(category, catindex){
                  try {
                    sortedChannels[package.machineName][catindex] = packaged[package.machineName][catindex]; 
                  }
                  catch(err) {
                    console.log(err);
                  }
                });
              });
              //console.log(sortedChannels);
              wrapChan = [sortedChannels];
              myview.collection = new Backbone.Collection(_.toArray(wrapChan));
              myview.trigger("vod:showDefault", myview.collection.models[0].attributes.basic['business-finance'][0]);
              myview.trigger('collectresetVOD');
            },
            error: function(model,response,options) {
              console.log('error');
            }
          });
      });
      this.on('collectresetVOD', this.render);
    }
  });

  List.Category = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'category',
    template: '#tpl-category-titles'
  });

  List.Categories = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'categories-container',
    itemView: List.Category,
    initialize: function() {
      this.collection = new Omnibox.Entities.VODCategoryCollection();
      this.collection.fetch({reset:true});
      this.listenTo(this.collection, 'reset', this.render);
    }
  });

});


});