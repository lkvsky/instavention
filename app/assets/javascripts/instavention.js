window.Instavention = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new InstaventionRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Instavention.initialize();
});
