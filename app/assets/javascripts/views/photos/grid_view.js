Instavention.Views.GridView = Backbone.View.extend({

  NUM_ROWS: 4,
  NUM_COLS: 4,
  NUM_MATCHES: 5,
  NUM_BOMBS: 1,

  exposedMatches: 0,

  el: "#grid",

  events: {
    "click .grid img": "exposePhoto",
    "click img[data-bomb='1']": "exposeBomb"
  },

  initialize: function() {
    _.templateSettings = {
      interpolate: /\{\{\=(.+?)\}\}/g,
      evaluate: /\{\{(.+?)\}\}/g
    };
  },

  // Rendering and event binding

  render: function() {
    var template = _.template($("#grid-tpl").html());

    this.$el.html(template({grid: this.grid, bomb: this.bombedModel, match: this.matchedModel}));
  },

  exposeBomb: function(e) {
    $(".cover").removeClass("cover");
    $(".grid img").removeClass("hidden");
    $(".grid img").addClass("game-over");

    $(e.target).removeClass("game-over");
    $(e.target).addClass("bomb");
    $(e.target).addClass("uncover");
  },

  exposePhoto: function(e) {
    $(e.target).closest(".cover").removeClass("cover");
    $(e.target).removeClass("hidden");
    $(e.target).addClass("uncover");

    if ($(e.target).data("match") == "1") {
      $(e.target).addClass("match");
    }
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

  setGamePlay: function(attribute) {
    for (var i=0; i<this.collection.length; i++) {
      var model = this.collection.at(i);
      model.set(attribute, 0);
    }

    var matchIndex = this.chooseImagePosition();

    if (attribute == "game_match") {
      this.matchedModel = this.collection.at(matchIndex);
      this.matchedModel.set(attribute, 1);
    } else {
      this.bombedModel = this.collection.at(matchIndex);
      this.bombedModel.set(attribute, 1);
    }
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