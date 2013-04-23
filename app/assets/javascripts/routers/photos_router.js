Instavention.Routers.InstaventionRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function() {
    new Instavention.Views.AppView({el: ".container"});
  }
});