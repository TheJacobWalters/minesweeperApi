express = require('express')
app = express()
port = 3000
//var board = [[0,1,1], [0,1,1]]
// generate random board
var board = []
var externalBoard = []
//var i = 0

/* Notes
Internal Board
0 : No mine
1 : there is a mine
10: there is 0 mines touching a space
11: there is 1 mines touching a space

External Board
2 : not turned over
3 : flag Image
4 : Mine Image

generate a board
5 mines in a random 
when a square gets clicked then 
*/ 
function genGameBoard() {
	board = []
	for (i = 0; i < 5; i ++) {
		var row = []
		k = 0
		for (k = 0 ; k < 5; k++){	
			row.push(Math.round(Math.random()))
		}
		board.push(row)
	}
}
function genGameBoard(){
	board = []
	minespaces = []
	// figure out mine locations
	while (minespaces.length < 5) {
		x = Math.round((Math.random() * 4) )
		y = Math.round((Math.random() * 4) )
		z = [x,y]
		if (!board.includes(z)) {
			minespaces.push(z)
		}
	}
	// make board a list of lists that is 5 lists long
	for(i = 0; i < 5; i++){
		board.push([])
	}
	// insert the mines into the board
	function insertMines(loc){
		board[ loc[0] ] [ loc[1] ] = 1
	}
	minespaces.forEach(insertMines)
	console.log(board)
	// insert the hints into the board
	return minespaces
}
function genExternalBoard () {
	externalBoard = []
	for (i =0; i < 3; i++){
		var row = []
		for (k =0; k < 3; k++){
			row.push(2)
		}
		externalBoard.push(row)
	}
}
genGameBoard()
genExternalBoard()

app.get('/dev', (req, res) => {
	res.send(genGameBoard())
})

app.get('/newgame', (req, res) => {
	genGameBoard()
	genExternalBoard()
	r = {
		status: 'ok'
	}
	res.send(r)
})

app.get('/getExternalBoard', (req, res) => {
	r = {
		status: 'ok',
		externalBoard: externalBoard
	}
	res.send(r)
})

app.get('/getGameBoard', (req, res) => {
	r = {
		status: 'ok',
		gameboard: board
	}
	res.send(r)
})
function transformExternalLostGame () {
	
}
app.get('/click/:xcoord/:ycoord', (req, res) =>{
	//res.send(req.params)
	x = Number(req.params.xcoord)
	y = Number(req.params.ycoord)
	z = board[x][y]
	status = z ? 'lost game' : 'ok'
	r = {
		status : status,
		gameboard : board
	}	
	res.json(r)
	console.log(board[x][y])
})

app.listen(port, () => {
	console.log('starting server')
})
