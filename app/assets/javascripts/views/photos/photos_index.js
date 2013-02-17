var PhotosView = Backbone.View.extend({

  NUM_ROWS: 4,
  NUM_COLS: 4,
  NUM_MATCHES: 5,
  NUM_BOMBS: 1,

  gameStats: {
    gamesWon: 0,
    gamesLost: 0
  },

  exposedMatches: 0,

  el: "#grid",

  initialize: function() {
    _.bindAll(this, "resetGame");

    this.collection.bind("reset", this.resetGame, this);

    _.templateSettings = {
      interpolate: /\{\{\=(.+?)\}\}/g,
      evaluate: /\{\{(.+?)\}\}/g
    };
  },

  events: {
    "click img": "checkStats"
  },

  // Rendering and event binding

  renderGame: function() {
    var template = _.template($("#grid-tpl").html());

    this.$el.html(template({grid: this.grid, bomb: this.bombedModel, match: this.matchedModel}));
    this.bindEvents();
    this.initializeStatus();
  },

  initializeStatus: function() {
    $("#game-status").empty();

    var winSpan = $("<span>");
    var txtSpan = $("<span>");

    winSpan.attr("id", "win-status").html("5");
    txtSpan.html(" matches needed to win!");

    $("#game-status").append(winSpan).append(txtSpan);
  },

  bindEvents: function() {
    $(".cover").on("click", this.flipTile);
    $(".grid img").on("click", this.exposePhoto);
    $("img[data-bomb='1']").on("click", this.exposeBomb);
    $("#reset-game").on("click", this.resetGame);
  },

  exposeBomb: function() {
    $(".cover").removeClass("cover");
    $(".grid img").removeClass("hidden");
    $(".grid img").addClass("game-over");

    $(this).removeClass("game-over");
    $(this).addClass("bomb");
    $(this).addClass("uncover");
  },

  flipTile: function() {
    $(this).removeClass("cover");
  },

  exposePhoto: function() {
    $(this).removeClass("hidden");
    $(this).addClass("uncover");

    if ($(this).data("match") == "1") {
      $(this).addClass("match");
    }
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
      var matchesLeft = this.NUM_MATCHES - uncovered.length;
      $("#win-status").html(matchesLeft);
    }
  },

  increaseWin: function() {
    var uncovered = $(".grid img.match");
    if ($(".grid img").hasClass("stats-calculated")) {
      return;
    } else if (uncovered.length == this.NUM_MATCHES) {
      this.gameStats.gamesWon += 1;
      $("#game-status").html("You won!");
      $(".grid img").addClass("stats-calculated");
      $("#win-count").html(this.gameStats.gamesWon);
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
      this.gameStats.gamesLost += 1;
      $(".grid img").addClass("stats-calculated");
      $("#loss-count").html(this.gameStats.gamesLost);
      $("#game-status").html("Uh oh! Looks like you need an #instavention.");
    }
  },

  resetGame: function() {
    // $("#win-status").html("<span id='win-status'>5</span> matches needed to win!");
    this.exposedMatches = 0;
    this.makeGrid();
    this.initializeGridSlots();
    this.chooseMatch();
    this.chooseBomb();
    this.fillGrid();
    this.renderGame();
  },

  // Grid filling functions

  makeGrid: function() {
    this.grid = [];

    for (var i=0; i<this.NUM_ROWS; i++) {
      this.grid[i] = [];
      for (var j=0; j<this.NUM_COLS; j++) {
        this.grid[i][j] = i * this.NUM_ROWS + j;
      }
    }
  },

  initializeGridSlots: function() {
    this.freeImageSlots = [];

    for (var i=0; i<this.collection.length; i++) {
      this.freeImageSlots.push(i);
    }
  },

  chooseMatch: function() {
    for (var i=0; i<this.collection.length; i++) {
      var model = this.collection.at(i);
      model.set("game_match", 0);
    }

    var matchIndex = this.chooseImagePosition();

    this.matchedModel = this.collection.at(matchIndex);
    this.matchedModel.set("game_match", 1);

    return this.matchedModel;
  },

  chooseBomb: function() {
    for (var i=0; i<this.collection.length; i++) {
      var model = this.collection.at(i);
      model.set("game_bomb", 0);
    }

    var matchIndex = this.chooseImagePosition();

    this.bombedModel = this.collection.at(matchIndex);
    this.bombedModel.set("game_bomb", 1);

    return this.bombedModel;
  },

   fillGrid: function() {
    var spaces = (this.NUM_ROWS * this.NUM_COLS) - (this.NUM_MATCHES + this.NUM_BOMBS);

    for (var i=0; i<this.NUM_MATCHES; i++) {
      this.placement(this.matchedModel);
    }

    for (i=0; i<this.NUM_BOMBS; i++) {
      this.placement(this.bombedModel);
    }

    for (i=0,modelindex=0; i<spaces; i++) {
      var imgIndex = this.chooseImagePosition();
      this.placement(this.collection.models[imgIndex]);
    }
  },

  // Utility functions

  placement: function(image) {
    var num1 = Math.floor(Math.random() * this.NUM_ROWS);
    var num2 = Math.floor(Math.random() * this.NUM_COLS);

    if (typeof(this.grid[num1][num2]) == "number") {
      this.grid[num1].splice(num2, 1, image);
    } else {
      this.placement(image);
    }
  },

  chooseImagePosition: function() {
    var randomIndex = Math.floor(Math.random() * this.freeImageSlots.length);
    var returnValue = this.freeImageSlots[randomIndex];

    this.freeImageSlots.splice(randomIndex, 1);

    return returnValue;
  }

});