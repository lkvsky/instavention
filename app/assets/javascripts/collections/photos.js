var PhotosCollection = Backbone.Collection.extend({
  model: Photo,

  url: '/photos'
});