window.Instavention = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Instavention.Routers.InstaventionRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Instavention.initialize();
});
