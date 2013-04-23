Instavention.Views.AppView = Backbone.View.extend({
  gameStats: {
    gamesWon: 0,
    gamesLost: 0
  },

  events: {
    "click #reset": "resetGame",
    "click img": "checkStats"
  },

  initialize: function() {
    this.photos = new Instavention.Collections.PhotosCollection();
    this.photos.fetch();

    this.photos.bind("reset", this.resetGame, this);

    this.gridView = new Instavention.Views.GridView({collection: this.photos});
  },

  resetGame: function() {
    this.initializeStatus();
    this.gridView.exposedMatches = 0;
    this.gridView.makeGrid();
    this.gridView.initializeGridSlots();
    this.gridView.setGamePlay("game_match");
    this.gridView.setGamePlay("game_bomb");
    this.gridView.fillGrid();
    this.gridView.render();
  },

  initializeStatus: function() {
    $(".game-status").empty();

    var winSpan = $("<span>");
    var txtSpan = $("<span>");

    winSpan.attr("class", "win-status").html("5");
    txtSpan.html(" matches needed to win!");

    $(".game-status").append(winSpan).append(txtSpan);
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
      var matchesLeft = this.gridView.NUM_MATCHES - uncovered.length;
      $(".win-status").html(matchesLeft);
    }
  },

  increaseWin: function() {
    var uncovered = $(".grid img.match");
    if ($(".grid img").hasClass("stats-calculated")) {
      return;
    } else if (uncovered.length == this.gridView.NUM_MATCHES) {
      this.gameStats.gamesWon += 1;
      $(".game-status").html("You won!");
      $(".win-count").html(this.gameStats.gamesWon);
      $(".cover").removeClass("cover");
      $(".grid img").addClass("stats-calculated").removeClass("hidden").addClass("game-over");
      $(".grid img.match").removeClass("game-over");
    }
  },

  increaseLoss: function() {
    var bomb = $("img[data-bomb='1']");
    if ($(".grid img").hasClass("stats-calculated")) {
      return;
    } else if (bomb.hasClass("uncover")) {
      this.gameStats.gamesLost += 1;
      $(".grid img").addClass("stats-calculated");
      $(".loss-count").html(this.gameStats.gamesLost);
      $(".game-status").html("Uh oh! Looks like you need an #instavention.");
    }
  }
});