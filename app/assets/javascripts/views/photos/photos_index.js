var PhotosView = Backbone.View.extend({

  NUM_ROWS: 4,
  NUM_COLS: 4,
  NUM_MATCHES: 4,
  NUM_BOMBS: 3,

  initialize: function(collection) {
    this.collection = collection;

    _.bindAll(this, "resetGame");
    this.collection.bind("reset", this.resetGame, this);

    _.templateSettings = {
      interpolate: /\{\{\=(.+?)\}\}/g,
      evaluate: /\{\{(.+?)\}\}/g
    };
  },

  // Rendering

  renderGame: function() {
    var template = _.template($("#grid-tpl").html());
    $("#gameboard").html(template({grid: this.grid, bomb: this.bombedModel, match: this.matchedModel}));
    $(".cover").on("click", function(event) {
      $(this).removeClass("cover");
    });
    $(".grid img").on("click", function(event) {
      $(this).removeClass("hidden");
      $(this).addClass("uncover");
    });
  },

  resetGame: function() {
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