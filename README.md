# stockfishJSparser
parses output from stockfish.js and gets the best move


<h1>Usage:</h1>
In your HTML:

include this script, stockfishJSparser.js

requires stockfish.js in the folder 'js'.

Call getBestMoves(callbackFunction), Where callbackFunction is the name of any function you created.  You can name it whatever you want.  When Stockfish finishes its analysis, that function will fire. 

The function accepts one paramter, 'bestmoves'.  Bestmoves is an array of strings.  The number of best moves returned is a variable set at the top of stockfishJSparser.js.  The default is 1.  Feel free to modifiy it. 
The strings are moves in the form of 'a3-a4'.  There is no extended notation such as +, !, ?, or x (as in a3xb4).

<h2> Example </h2>

><script src='js/parseStockfish.js'></script>
><script>
>
>function callbackFunction(bestmoves){
>	console.log(bestmoves[0]);
>}
>
>getBestMoves(callbackFunction);  //must pass in the name of a function that will be the callback when moves are available
></script>

For a working example, just look at http://johnktejik.info/share/chessapp/

shareeditdeleteflag
