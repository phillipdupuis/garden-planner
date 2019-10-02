import '../App.css';
import '../css/plants.css';
import '../css/SquareFootPlot.css';
import React from 'react';
import PropTypes from 'prop-types';
import Plant from '../models/Plant';
import Layout from '../models/Layout';


const propTypes = {
  id: PropTypes.string.isRequired,
  plant: PropTypes.instanceOf(Plant),
  layout: PropTypes.instanceOf(Layout),
  onClick: PropTypes.func.isRequired
};

class SquareFootPlot extends React.Component {

  renderPlants() {
    if (this.props.plant) {
      const plantClass = `bg ${this.props.plant.className}`;
      const gridCellStyle = (row, col) => {return {gridArea: `${row + 1} / ${col + 1} / auto / auto`}};
      return (
        this.props.layout.fill.map(([row, col], i) => {
          return (
            <div
              className="plant"
              style={gridCellStyle(row, col)}
              key={i}
            >
              <div className={plantClass}></div>
            </div>
          );
        })
      );
    }
  }

  render() {
    return (
      <button
        className="plot"
        id={this.props.id}
        onClick={this.props.onClick}
      >
        <div
          className="plants"
          style={(this.props.layout) ? this.props.layout.styles : null}
        >
          {this.renderPlants()}
        </div>
      </button>
    );
  }
}

SquareFootPlot.propTypes = propTypes;

export default SquareFootPlot;