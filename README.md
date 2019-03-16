# stockfishJSparser
parses output from stockfish.js and gets the best move

requires stockfish.js in the folder 'js'.

The way it works is, you call getBestMoves(callbackFunction), and when the results are ready, callbackFunction (you can name it whatever you want) will fire. Bestmoves are passed in to this function as an array of strings. 

I make the moves by calling game.move() although this is not required.  Making the moves will require chess.js.  To visualize it you need chessboard.js files.

For a working example, just look at http://johnktejik.info/chessapp/

shareeditdeleteflag
