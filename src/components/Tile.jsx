import React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/Tile.css';

export default class Tile extends React.Component {
	handleClick = () => {
		if (this.props.onClick) {
			this.props.onClick(this.props.label);
		}
	};

	render() {
		//we only want to adjust the height and width if it is in a valid range
		if (this.props.rowWidth >= 3 && this.props.rowWidth <= 6){
			 //find new width and height values for individual tiles, based on the desired total width and height
			 var maxWidth = 360 / this.props.rowWidth; //desired max will total at 360
			 var minWidth = 240 / this.props.rowWidth; //desired min will total at 240
			 var width = 8 - (this.props.rowWidth - 3); //inversely decrease value based on width
			 var tileStyle = {
					height: width + "vmax",
					width: width + "vmax",
					maxHeight: maxWidth,
					maxWidth: maxWidth,
					minHeight: minWidth,
					minWidth: minWidth,
				};
		}
		return (
			<div className="Tile" style={tileStyle} onClick={this.handleClick}  label={this.props.label}>
				<div className="TileLabel">{this.props.label}</div>
			</div>
		);
	}
}

Tile.propTypes = {
	label: PropTypes.string,
	rowWidth: PropTypes.number
};
