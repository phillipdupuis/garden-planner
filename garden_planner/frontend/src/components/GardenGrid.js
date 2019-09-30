import '../App.css';
import '../css/GardenGrid.css';
import React from 'react';
import PropTypes from 'prop-types';
import SquareFootPlot from './SquareFootPlot';
import Plot from '../models/Plot';

const propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.instanceOf(Plot)
    )
  ).isRequired,
  numRows: PropTypes.number.isRequired,
  numCols: PropTypes.number.isRequired,
  handleGridClick: PropTypes.func.isRequired
};

class GardenGrid extends React.Component {

  gridContainerStyles() {
    const sqSizeToShowAllColumns = Math.floor(window.innerWidth * 0.9 / this.props.numCols);
    const sqSizeToShowAllRows = Math.floor(window.innerHeight * 0.7 / this.props.numRows);
    const sqSizeToShowEverything = Math.min(sqSizeToShowAllColumns, sqSizeToShowAllRows);
    // Make sure the square size is no smaller than 60 pixels
    const sqSize = Math.max(sqSizeToShowEverything, 60);
    return {
      width: `${sqSize * this.props.numCols}px`,
      height: `${sqSize * this.props.numRows}px`
    };
  }

  gridStyles() {
    return {
      gridTemplateRows: `repeat(${this.props.numRows}, 1fr)`,
      gridTemplateColumns: `repeat(${this.props.numCols}, 1fr)`,
    }
  }

  render() {
    return (
      <div
        id="gridContainer"
        style={this.gridContainerStyles()}
      >
        <div
          id="grid"
          style={this.gridStyles()}
        >
          {this.props.grid.map((row, rowNum) => {
            return row.map((plot, colNum) => {
              const id = `r${rowNum}c${colNum}`;
              return (
                <SquareFootPlot
                  key={id}
                  id={id}
                  plant={plot.plant}
                  layout={plot.layout}
                  onClick={() => this.props.handleGridClick(rowNum, colNum)}
                />
              );
            })
          })}
        </div>
      </div>
    );
  }
}

GardenGrid.propTypes = propTypes;

export default GardenGrid;