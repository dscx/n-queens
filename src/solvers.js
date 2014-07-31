/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.backtrack = function(board, n){
  var solved = [];
  //n = rooks

  var results = {};
  var cursed = function(depth, n){
  //base case - no more rooks to place
    if (n === 0) { 
      var matrix = [];
      //iterate over board.attributes
      //slice each row, and push into matrix
      if(!board.hasAnyColConflicts() ){
        for (var i = 0; i < board.attributes.n; i++) {
            matrix.push(board.attributes[i].slice());
        }
        solved.push(matrix);
      }    

      return;
    }
    //this for loop is not occuring
    for(var i=0; i < board.attributes[depth].length; i++){ //changed from board.attributed[depth].n
    //check for conflicts @ column [i]
      if(!board.hasColConflictAt(i)){ 
      //if false (no conflicts)
        //set rook to this location board[depth][i]
        board.attributes[depth][i] = 1;
        //recurse, need to go one level deeper
        cursed(depth+1,n-1);
        //set board[depth][i] back to 0
        board.attributes[depth][i] = 0;
      }
    }
  };
  cursed(0, n);
  // console.log(solved, ': line');
  return solved;
};

window.findNRooksSolution = function(n) {
  //CHECK THIS!!
  // var boardMaker = function(n){
  //   var template = [];
  //   for (var i =0; i < n; i++){
  //       template[i] = [];
  //       for (var j = 0; j < n; j++) {
  //         template[i][j] = 0;
  //       }
  //   }
  //   return template;
  // };
  //var b = new Board(boardMaker(n));
  
  var solution = backtrack(new Board({n:n}), n).shift(); 

  //make new board nxn
  //need to place n rooks as "1"
  //create rook class ?
    //assign row and col conflict functions ?
      //place function ->
        //calls row functions
          //if true (conflict) go to next spot
            //repeat
          //if false (no conflict)
            //place self
              //move to next piece
  //determine where first piece will go
    //test all possible locations of other rooks
  
  //use board
  //add rooks to matrix as "1" 's
  //output matrix w/ no conflicts
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = backtrack(new Board({n:n}), n).length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
