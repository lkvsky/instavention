var InstaventionRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function() {
    new AppView({el: ".container"});
  }
});