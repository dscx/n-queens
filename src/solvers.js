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
window.backtrack = function(board, n, piece){
  var solved = [];
  //n = total pieces
  var results = {};
  var cursed = function(depth, n){
  //base case - no more rooks to place
    var queenCheck; //checks if tests for queens passed
    if (n === 0) { 
      var matrix = [];
      queenCheck = true;
      if(piece === 'queen'){
        var conflict;
        conflict = board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts();
        queenCheck = (conflict) ? false:true;
      }
      if(!board.hasAnyColConflicts() && queenCheck){

         for (var i = 0; i < board.attributes.n; i++) {
             matrix.push(board.attributes[i].slice());
         }
         solved.push(matrix);
      }
      return;
    }
    
    for(var i=0; i < board.attributes.n; i++){ //changed from board.attributed[depth].n
      queenCheck = true;
      board.attributes[depth][i] = 1;
      if(piece === 'queen'){
        var conflict;
        conflict = board.hasMajorDiagonalConflictAt(i) || board.hasMinorDiagonalConflictAt(i);
        queenCheck = (conflict) ? false:true;
      }
      if(!board.hasColConflictAt(i) &&queenCheck){ 
    
        cursed(depth+1,n-1);
      }
      board.attributes[depth][i] = 0;
    }
  };
  cursed(0, n);
  // console.log(solved, ': line');
  return (solved.length) ? [solved, solved.length]:[boardMaker(n), solved.length];
};

window.boardMaker = function(n){
  var template = [];
  for (var i =0; i < n; i++){
      template[i] = [];
      for (var j = 0; j < n; j++) {
        template[i][j] = 0;
      }
  }
  return template;
};

window.findNRooksSolution = function(n) {
 var sol = backtrack(new Board({n:n}), n);
  
  var solution = sol[0].shift(); 

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var sol = backtrack(new Board({n:n}), n);
  var solutionCount = sol[1];
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var sol = backtrack(new Board({n:n}), n, 'queen');
  var solution = sol[0].shift();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = backtrack(new Board({n:n}), n, 'queen');
  if(n === 5){
    //console.log('n = 5: ', JSON.stringify(solution[0]));
  }
  var solutionCount = solution[1];


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
