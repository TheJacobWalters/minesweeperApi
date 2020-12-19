express = require('express')
app = express()
port = 3000
//var board = [[0,1,1], [0,1,1]]
// generate random board
var board = []
var i = 0

/* Notes
Internal Board
0 : No mine
1 : there is a mine

External Board
2 : not turned over
3 : flag Image
4 : Mine Image
*/
function genGameBoard() {
	board = []
	for (i = 0; i < 3; i ++) {
		var row = []
		k = 0
		for (k = 0 ; k < 3; k++){	
			row.push(Math.round(Math.random()))
		}
		board.push(row)
	}
}

genGameBoard()
app.get('/newgame', (req, res) => {
	genGameBoard()
	r = {
		status: 'ok'
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
