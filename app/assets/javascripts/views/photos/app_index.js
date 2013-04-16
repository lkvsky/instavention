var AppView = Backbone.View.extend({
  el: ".container",

  events: {
    "click #reset": "resetGame",
    "click img": "checkStats"
  },

  initialize: function() {
    this.photos = new PhotosCollection();
    this.photos.fetch();

    this.photosView = new PhotosView({collection: this.photos});
  },

  resetGame: function() {
    this.photosView.resetGame();
  },

  checkStats: function() {
    this.updateStats();
    this.increaseWin();
    this.increaseLoss();
  },

  updateStats: function() {
    var uncovered = $(".grid img.match");

    if (uncovered === undefined) {
      return;
    } else {
      var matchesLeft = this.photosView.NUM_MATCHES - uncovered.length;
      $(".win-status").html(matchesLeft);
    }
  },

  increaseWin: function() {
    var uncovered = $(".grid img.match");
    if ($(".grid img").hasClass("stats-calculated")) {
      return;
    } else if (uncovered.length == this.photosView.NUM_MATCHES) {
      this.photosView.gameStats.gamesWon += 1;
      $(".game-status").html("You won!");
      $(".grid img").addClass("stats-calculated");
      $(".win-count").html(this.photosView.gameStats.gamesWon);
      $(".cover").removeClass("cover");
      $(".grid img").removeClass("hidden");
      $(".grid img").addClass("game-over");
      $(".grid img.match").removeClass("game-over");
    }
  },

  increaseLoss: function() {
    var bomb = $("img[data-bomb='1']");
    if ($(".grid img").hasClass("stats-calculated")) {
      return;
    } else if (bomb.hasClass("uncover")) {
      this.photosView.gameStats.gamesLost += 1;
      $(".grid img").addClass("stats-calculated");
      $(".loss-count").html(this.photosView.gameStats.gamesLost);
      $(".game-status").html("Uh oh! Looks like you need an #instavention.");
    }
  },
});