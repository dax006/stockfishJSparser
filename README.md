# stockfishJSparser
parses output from stockfish.js and gets the best move


The way it works is, you call getBestMoves(callbackFunction), and when the results are ready, callbackFunction (you can name it whatever you want) will fire. Bestmoves are passed in as an array of strings. I make the moves by calling game.move().

For the full code, just look at http://johnktejik.info/chessapp/

shareeditdeleteflag
