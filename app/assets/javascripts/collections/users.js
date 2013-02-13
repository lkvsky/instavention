var UsersCollection = Backbone.Collection.extend({
  model: User,

  url: '/users'
});