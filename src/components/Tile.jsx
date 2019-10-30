import React from 'react';
import { PropTypes } from 'prop-types';
import "../styles/Tile.css"

export default class Tile extends React.Component {
  handleClick = () => {
  	if (this.props.onClick) {
  	  this.props.onClick(this.props.label);
    }
  }

  render() {
    return (
    <div className="Tile" onClick={this.handleClick}>
    <div className="TileLabel">
    {this.props.label}
    </div>
    </div>
    );
  }
}

Tile.propTypes = {
  label: PropTypes.string.isRequired
};

