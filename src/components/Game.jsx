import React from 'react';
import Tile from './Tile';
import '../styles/Game.css';
import nextIcon from '../images/next.png';
import shuffleIcon from '../images/shuffle.png';
import resetIcon from '../images/reset.png';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0, //dimension of one side
			tiles: {}, //An object which holds keys and value pairs for each tile. Since this will be treated as an array, it will be referred to as the tile array
			solved: false, //puzzle is solved value
			moves: 0, //valid clicks player makes
			completed: 0, //number of puzzles completed
		};
	}

	//populates and shuffles the tile object when the component is first mounted
	componentDidMount() {
		this.restartPuzzle();
	}

	//creates an ordered object of numbers to populate the tiles
	genTile(width) {
		let i;
		let array = {};

		//generates ordered hash, where key :: value
		for (i = 0; i < width * width - 1; i++) { //initializes tile numbers 1 to last-1. e.g. 1-8 for a 9 tile puzzle
			Object.assign(array, { [i.toString()]: (i + 1).toString() }); //s.t. value = key+1
		}

		//the last tile will always be blank at the start of the puzzle
		Object.assign(array, { [i.toString()]: '' });

		return array;
	}

	//takes the object array of tiles and then reshuffles it
	shuffle(array) {
		let ran, temp;
		let curr = Object.keys(array).length - 1; //starts with the last non-empty tile space
		//cycles through individual elements in the array
		while (curr !== 0) {
			//gets random index
			ran = Math.floor(Math.random() * curr--);

			//performs swap
			temp = array[curr.toString()];
			array[curr.toString()] = array[ran.toString()];
			array[ran.toString()] = temp;
		}

		return array;
	}


	ordered(array) {
		let i;
		let length = Object.keys(array).length - 1;

		for (i = 0; i < length; i++) {
			//if value is not ordered, invalid
			if (parseInt(array[i.toString()]) !== i + 1) {
				return false;
			}
		}

		return true;
	}

	solvable(array, width = this.state.width) {
	  //checks solvability for the current width
		if (width < 3){
			return false;
		}
		//inversion counter, indexes
		let i, j;
		let inversions = 0;
		let blankPos = width * width - 1; //stores blank position

		for (i = 0; i < width * width - 1; i++) {
			for (j = i + 1; j < width * width; j++) {
				if (array[i.toString()] === '') {
					blankPos = i;
				}
				//counts number of inversions. Inversions are when numbers appear out of order, s.t. i > j
				if (
					array[j.toString()] !== '' &&
					array[i.toString()] !== '' &&
					parseInt(array[i.toString()]) > parseInt(array[j.toString()])
				) {
					inversions += 1;
				}
			}
		}

		if (width % 2 === 1) {
			//if width is odd
			if (inversions % 2 === 0) {
				//number of inversions is even
				return true;
			}
		}
		//if width is even, then
		else if (parseInt((blankPos / width) % 2) === 1) {
			//if blank is on an odd row
			if (inversions % 2 === 0) {
				//number of inversions is even
				return true;
			}
		} else {
			//if blank is on an even row
			if (inversions % 2 === 1) {
				//number of inversions is odd
				return true;
			}
		}

		//otherwise false
		return false;
	}

	reset(width = this.state.width) {
		let array = this.shuffle(this.genTile(width));
		while (this.solvable(array, width) === false || this.ordered(array) === true) {
			array = this.shuffle(array);
		}
		this.setState({
			width: width,
			moves: 0,
			solved: false,
			tiles: array
		});

		return array;
	}

	nextPuzzle() {
		if (this.state.solved) {
			this.reset(this.state.width + 1);
		}
	}

	restartPuzzle() {
		this.reset(3);
		this.setState({completed: 0});
	}

	getKeyByValue(tileNumber) {
		return Object.keys(this.state.tiles).find(
			(key) => this.state.tiles[key] === tileNumber,
		);
	}

	handleClick = (tileNumber) => {
		if (this.state.solved) {
			return;
		}
		console.log(
			'The tile was clicked.',
			tileNumber,
			this.getKeyByValue(tileNumber),
			this.getKeyByValue(''),
		);

		const blank_key = this.getKeyByValue('');
		const tile_key = this.getKeyByValue(tileNumber);
		let bk_num = parseInt(blank_key);
		let tk_num = parseInt(tile_key);
		let width = this.state.width;
		let tiles = this.state.tiles;
		if (
			Math.abs(bk_num - tk_num) === 1 ||
			Math.abs(bk_num - tk_num) === width
		) {
			//check for edge violation
			if (
				(bk_num % width !== 0 || tk_num % width !== width - 1) &&
				(tk_num % width !== 0 || bk_num % width !== width - 1)
			) {
				tiles[blank_key] = tileNumber;
				tiles[tile_key] = '';
				//update state
				let solved = this.ordered(this.state.tiles);
				let completed = this.state.completed;
				if (solved){
					completed += 1;
				}

				this.setState({
					moves: this.state.moves + 1,
					completed: completed,
					solved: solved,
					tiles: tiles,
				});
			}
		}
	};

	renderTile(tileNumber) {
		return (
			<Tile label={this.state.tiles[tileNumber]} onClick={this.handleClick} key={tileNumber}/>
		);
	}

	renderRows(tileNumber) {
		let width = this.state.width;
		let row = [];
		let i;
		for (i = 0; i < width; i++) {
			row.push(this.renderTile(tileNumber++));
		}

		return row;
	}

	renderCols(tileNumber) {
		let height = this.state.width;
		let cols = [];
		let i;
		let tNum = parseInt(tileNumber);
		for (i = 0; i < height; i++) {
			cols.push(
				<div className="GameRow" key={(tNum * -1).toString()}>
					{this.renderRows(tNum.toString())}
				</div>,
			);
			tNum += height;
		}

		return cols;
	}

	render() {
		return (
			<div className="Game" align="center">
				<div className="GameStats">
					<h2>Completed: {this.state.completed}</h2>
					<h2>Moves: {this.state.moves}</h2>
				</div>
				<div className="GameBoard">{this.renderCols('0')}</div>
				<div className="GameInterface">
					<button style={{float: "left"}}
						onClick={() => {
							this.restartPuzzle();
						}}>
						<img src={resetIcon} alt="Restart"/>
					</button>
					<button
						onClick={() => {
							this.reset();
						}}>
						<img src={shuffleIcon} alt="Shuffle"/>
					</button>
					<button style={{float: "right"}}
						onClick={() => {
							this.nextPuzzle();
						}}>
						<img src={nextIcon} alt="Next"/>
					</button>
				</div>
			</div>
		);
	}
}
