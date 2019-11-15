import React from 'react';
import './styles/App.css';
import Game from './components/Game';

function App() {
	return (
		<div className="container">
		<div className="game">
			<h1>Solve the Puzzle!</h1>
			<Game/>
			<h3>This is a tile puzzle game. The goal of the game is to place all the tiles into numerical order by sliding each tile only using the empty space.</h3>
		</div>
		<div className="bottom">&copy; 2019 Cameron Griffith. All Rights Reserved.</div>
		</div>
	);
}

export default App;
