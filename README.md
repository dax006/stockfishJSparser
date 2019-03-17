# stockfishJSparser
parses output from stockfish.js and gets the best move



**Useage:**
In your HTML:
include this script, stockfishJSparser.js
requires stockfish.js in the folder 'js'.

Call getBestMoves(callbackFunction), Where callbackFunction is the name of any function you created.  You can name it whatever you want.  When Stockfish finishes its analysis, that function will fire. 

The function accepts one paramter, 'bestmoves'.  Bestmoves is an array of strings.  The strings are moves in the form of 'a3-a4'.  There is no extended notation such as +, !, ?, or x (as in a3xb4).

Here is an example of the code you write.

>function callbackFunction(bestmoves){
>	console.log(bestmoves[0]);
>}

>getBestMoves(callbackFunction);  //must pass in the name of a function that will be the callback when moves are available


For a working example, just look at http://johnktejik.info/share/chessapp/

shareeditdeleteflag
