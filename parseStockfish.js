//GLOBALS
// YOU CAN EDIT THESE or change them in your code
var numBESTMOVES = 1;  //edit to whatever you want.
var DIFFICULTY = 20;
//

var arr = [];
var callbackHandler;  //stores function name for callback for getBestMoves

var stockfish = new Worker('js/stockfish.js');  //load the stockfish engine

stockfish.onmessage = function(event) {  //the message handler
  //console.log(event.data);
  
  document.getElementById("engineoutput").innerHTML += "<pre>" + event.data+"</pre>";  //pre is there so the 'd' command (draw board) appears properly 
  var bestMoves = getBestMoves1(event.data,numBESTMOVES);  
  if(bestMoves != undefined){  //remember, it only spits out the best moves at the END of the analysis
  	callbackHandler(bestMoves);  
  }
};

//send startup script
stockfish.postMessage('uci');
stockfish.postMessage('isready');
stockfish.postMessage('setoption name MultiPV value '+numBESTMOVES);
stockfish.postMessage('ucinewgame');
//stockfish.postMessage('position fen N7/P3pk1p/3p2p1/r4p2/8/4b2B/4P1KP/1R6 w - - 0 34');  //an example


//################################################################## functions start #################################################################################//


function topMoves(arr,numMoves){  //get the top X moves, X = numMoves
	var bestlines = [];  //initialize array;
	var alen = arr.length;
	
	for(i = alen-1; i>0;i--){  //loop backwards
		line = arr[i];  //get a single line

		if(line == null) continue;  //happens sometimes, not sure why.  Just skip it

		words = line.split(" ");  //get words in the line
		if(words[1] == "depth"){  //look for 'info depth'
				//get numMoves lines of engine output
				for(j = 0; j < numMoves; j++){
					bestlines.push(arr[i-j]);  //add line to array
				}
				break;  //exit loop
		}
	}
	return bestlines;
}


function parseMoves(arr,numMoves){			//loop backwards through arr to find best numMoves moves

			var i, j, line;
			var bestmoves = [];  //initialize array;

			var bestlines = topMoves(arr,numMoves);

			//parse the bestlines to find the best moves
			bestlines.forEach(function(line){  //search best lines for the best single move
				words = line.split(" ");
				var index = words.indexOf('pv');  //find the keyword pv.
				var bestmove = words[index + 1];  
				bestmoves.push(bestmove);   //add it to our array

			});


	return bestmoves;  //these are ordered worst to best
}

function getBestMoves1(str, numMoves = numBESTMOVES){  //stores all stockfish data, when the final line (bestmove) is found, start the analysis
	
	arr.push(str);  //store everything
	var words = str.split(" ");

	//analysis complete, get top moves, clear data structures
	if (words[0] == 'bestmove'){  //doesnt always work.  Results come back asyncronously with other searches!

		if(numMoves == 1){
			var bestmoves=[words[1]];
		}else{
			var bestmoves = parseMoves(arr,numMoves);
			bestmoves.reverse();  //from best to worst
		}
		arr = [];  //empty array

		bestmoves = s2cbjs(bestmoves);

	}

	return bestmoves;

}

function s2cbjs(bestmoves){  //converts from Stockfish To ChessBoardJS notation (it adds a - )

	var cbjs = [];
	bestmoves.forEach(function(move){
		var index = move.search(/\d/);  //https://stackoverflow.com/questions/15682434/how-to-get-index-of-the-first-digit-in-string
		var newmove = move.substring(0,index+1) + "-" + move.substring(index+1);
		cbjs.push(newmove);

	});

	return cbjs;
}

function getBestMoves(handler){  //handler is the function that is called to return the best moves

		var fen = game.fen();
		stockfish.postMessage('position fen '+fen);  //set board for stockfish to analyse
		stockfish.postMessage('go depth ' + DIFFICULTY);  //EDIT as necessary

		callbackHandler = function(input){  //sends control back to the main page, using the name of the function the user passed in
			handler(input);
		}
}
