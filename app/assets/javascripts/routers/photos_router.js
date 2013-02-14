var InstaventionRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function() {
    this.photos = new PhotosCollection();
    this.photos.fetch();
  },

  index: function() {
    new PhotosView({collection: this.photos});
  }
});