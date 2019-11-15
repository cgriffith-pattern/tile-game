import React from 'react';
import Tile from './Tile';
import '../styles/Game.css';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			width: 3, //dimension of one side
			tiles: {},
			solved: false, //puzzle is solved value
			moves: 0, //valid clicks player makes
			completed: 0, //number of puzzles completed
		};
	}

	componentDidMount() {
		this.reset();
	}

	genTile(w) {
		let array = {};
		var i;

		//generates ordered hash, where key :: value
		for (i = 0; i < w * w - 1; i++) {
			Object.assign(array, { [i.toString()]: (i + 1).toString() }); //s.t. value = key+1
		}

		//blank tile will always be last
		Object.assign(array, { [i.toString()]: '' });

		return array;
	}

	shuffle(array) {
		var ran,
			temp,
			curr = this.state.width * this.state.width - 1;
		//cycles through individual elements in array
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
		if (this.state.solved) {
			return true;
		}

		var i,
			length = this.state.width * this.state.width - 1;

		for (i = 0; i < length; i++) {
			//if value is not ordered, invalid
			if (parseInt(array[i.toString()]) !== i + 1) {
				return false;
			}
		}
		this.setState({ completed: this.state.completed + 1 }); //increment completed puzzles counter
		return true;
	}

	solvable(array) {
		var width = this.state.width;
		var inversions = 0,
			i,
			j; //inversion counter, indexes
		var blankPos = width * width - 1; //stores blank position

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

	/*Brute force method of implementing reset, nextPuzzle, and restartPuzzle. Directly mutates state.*/
	reset() {
		this.state.solved = false;
		this.state.moves = 0;
		let array = this.shuffle(this.genTile(this.state.width));
		while (this.solvable(array) === false || this.ordered(array) === true) {
			this.shuffle(array);
		}
		this.setState({ tiles: array });

		return this.state.tiles;
	}

	nextPuzzle() {
		if (this.state.solved) {
			this.state.width = this.state.width + 1;
			this.reset();
			return this.state.width;
		}
		return this.state.width;
	}

	restartPuzzle() {
		this.state.width = 3;
		this.state.completed = 0;
		this.reset();
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
		var bk_num = parseInt(blank_key);
		var tk_num = parseInt(tile_key);
		var width = this.state.width;
		var tiles = this.state.tiles;
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
				this.setState({
					solved: this.ordered(this.state.tiles),
					moves: this.state.moves + 1,
					tiles: tiles,
				});
			}
		}
	};

	renderTile(tileNumber) {
		return (
			<Tile label={this.state.tiles[tileNumber]} onClick={this.handleClick} />
		);
	}

	renderRows(tileNumber) {
		var width = this.state.width;
		let row = [];
		var i;
		for (i = 0; i < width; i++) {
			row.push(this.renderTile(tileNumber++));
		}

		return row;
	}

	renderCols(tileNumber) {
		var height = this.state.width;
		let cols = [];
		var i;
		var tNum = parseInt(tileNumber);
		for (i = 0; i < height; i++) {
			cols.push(
				<div className="GameRow"> {this.renderRows(tNum.toString())} </div>,
			);
			tNum += height;
		}

		return cols;
	}

	render() {
		return (
			<div>
				<h1>Solve the Puzzle!</h1>
				<div align="center">
					<h2>Completed: {this.state.completed}</h2>
					<h2>Moves: {this.state.moves}</h2>
					<div className="GameBoard">{this.renderCols('0')}</div>
					<div>
						<button
							onClick={() => {
								this.nextPuzzle();
							}}>
							{' '}
							next puzzle{' '}
						</button>
					</div>
					<div>
						<button
							onClick={() => {
								this.reset();
							}}>
							reshuffle
						</button>
					</div>
					<div>
						<button
							onClick={() => {
								this.restartPuzzle();
							}}>
							restart
						</button>
					</div>
				</div>
			</div>
		);
	}
}
