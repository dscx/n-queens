// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //row index, is the index number of the outermost array
      //_.reduce on row index if output is greater than = 2 return true
      //otherwise return false
      var count = _.reduce(this.attributes[rowIndex], function(memo, value){
        return memo+value;
      }, 0);

      return (count >= 2) ? true:false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var conflict = false;
      var self = this;
      _.each(this.attributes, function(v,i){
        if(self.hasRowConflictAt(i)){
          conflict = true;
        }
      });
      return conflict; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //use _.pluck. iterate through each row look at value at colindex
      var col = _.pluck(this.attributes, colIndex); //retuns [items @ colindex]
      //console.log(col + ": line 113");
      //use _.reduce to count if 2 or greater on items in col
      var count = _.reduce(col, function(memo, value){
        //if value is a number
        if(typeof value === 'number'){
          return memo+value;
        } 
        return memo;

      }, 0);
      
      return (count >= 2) ? true:false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var conflict = false;
      //iterate through the callIndex of the board array
      //total colums = length of row[0]
      var columnCount = this.attributes[0].length;
      for(var i = 0; i < columnCount; i++){
        if (this.hasColConflictAt(i)) {
          conflict = true;
        }
      }
      return conflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //if there is a value at index of the board, and there is a value in any of the below
      //add one to boardindex and add one to rowindex and if there is a 1 there, then there
      //is a conflict
      //first run starting at rowindex = 0, columnindex <-majorDiago...
      //check value
        //add value to counter variable
      //add 1 to rowindex and columnindex
        //check values
        //check if columnindex > column.length
        //check if rowindex > row.length
        //if greater than length, continue on
        var rowLength = this.attributes.n;
        var colLength = this.attributes[0].length;
        var self = this;

        var checkPos = function(rowIndex, columnIndex){
          if(rowIndex >= rowLength || columnIndex >= colLength){
            return 0;
          }

          var memo = self.attributes[rowIndex][columnIndex];
          return memo + checkPos(rowIndex +1, columnIndex +1);
        };
      var count = checkPos(0,majorDiagonalColumnIndexAtFirstRow);
        
      return (count >= 2) ? true:false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //run hamdc on each column
      var columnCount = this.attributes[0].length;
      var conflict = false;
      for(var i = 0; i < columnCount; i++){
        if(this.hasMajorDiagonalConflictAt(i)){
          conflict = true;
        }
      }
      return conflict; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rowLength = this.attributes.n;
      var self = this;

      function checkPos(rowIndex, columnIndex){
        //base case
        if(rowIndex >= rowLength || columnIndex < 0){
          return 0;
        }
        var memo = self.attributes[rowIndex][columnIndex];
        return memo + checkPos(rowIndex+1, columnIndex - 1);
      }

      var count = checkPos(0, minorDiagonalColumnIndexAtFirstRow);
      return (count >= 2) ? true:false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var columnIndex = this.attributes[0].length -1;
      var conflict = false;
      for(var i =columnIndex; i >= 0; i--){
        if(this.hasMinorDiagonalConflictAt(i)){
          conflict = true;
        }
      }
      return conflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
