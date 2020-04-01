import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import PlantPicker from '../components/PlantPicker';
import GardenGrid from '../components/GardenGrid';
import GardenControls from '../components/GardenControls';
import Plant from '../models/Plant';
import Layout from '../models/Layout';
import Plot from '../models/Plot';


// iteration helpers
const range = (length) => [...Array(length).keys()];

// grid helpers
const createRow = (length) => new Array(length).fill().map(cell => new Plot());
const createGrid = (numRows, numCols) => Array(numRows).fill().map(row => createRow(numCols));
const cloneGrid = (grid) => grid.map(row => row.slice());


class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numRows: 4,
      numCols: 4,
      grid: createGrid(4, 4),
      showPlantPicker: false,
    };
    this.handleGridClick = this.handleGridClick.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addCol = this.addCol.bind(this);
    this.clickedRow = null;
    this.clickedCol = null;
    this.history = [];
  }

  componentDidMount() {
    Plant.loadObjectsFromApi();
    Layout.loadObjectsFromApi();
  }

  handleGridClick(row, col) {
    this.clickedRow = row;
    this.clickedCol = col;
    this.setState({ showPlantPicker: true });
  }

  addRow(index) {
    const numRows = this.state.numRows + 1;
    const grid = cloneGrid(this.state.grid);
    grid.splice(index, 0, createRow(this.state.numCols));
    this.setState({ numRows: numRows, grid: grid });
  }

  addRowOptions() {
    const label = (index) => {
      if (index === 0) {
        return 'To top';
      } else if (index === this.state.numRows) {
        return 'To bottom';
      } else {
        return `Insert below ${index}`;
      }
    }
    return (
      range(this.state.numRows + 1).map(index => {
        return {
          label: label(index),
          handleSelect: this.addRow.bind(this, index)
        };
      })
    );
  }

  deleteRow(index) {
    this.setState((state) => {
      return {
        numRows: state.numRows - 1,
        grid: state.grid.map((row, rowNum) => (rowNum === index) ? null : row.slice()).filter(Boolean),
      }
    });
  }

  deleteRowOptions() {
    const label = (index) => String(index + 1);
    return (
      range(this.state.numRows).map(index => {
        return {
          label: label(index),
          handleSelect: this.deleteRow.bind(this, index)
        };
      })
    );
  }

  addCol(index) {
    const numCols = this.state.numCols + 1;
    const grid = cloneGrid(this.state.grid);
    grid.forEach(row => row.splice(index, 0, new Plot()));
    this.setState({ numCols: numCols, grid: grid });
  }

  addColOptions() {
    const label = (index) => {
      if (index === 0) {
        return 'To left';
      } else if (index === this.state.numCols) {
        return 'To right';
      } else {
        return `Insert right of ${index}`;
      }
    }
    return (
      range(this.state.numCols + 1).map(index => {
        return {
          label: label(index),
          handleSelect: this.addCol.bind(this, index)
        };
      })
    );
  }

  deleteCol(index) {
    this.setState((state) => {
      return {
        numCols: state.numCols - 1,
        grid: state.grid.map(row => row.map((plot, colNum) => (colNum === index) ? null : plot).filter(Boolean)),
      }
    });
  }

  deleteColOptions() {
    const label = (index) => String(index + 1);
    return (
      range(this.state.numCols).map(index => {
        return {
          label: label(index),
          handleSelect: this.deleteCol.bind(this, index)
        };
      })
    );
  }

  handlePlantPickerSelection(plant, layout) {
    const grid = cloneGrid(this.state.grid);
    const plot = grid[this.clickedRow][this.clickedCol];
    Object.assign(plot, { plant: plant, layout: layout });
    this.clickedRow = null;
    this.clickedCol = null;
    this.setState({ grid: grid, showPlantPicker: false });
  }

  renderPlantPicker() {
    if (this.state.showPlantPicker) {
      const row = this.clickedRow;
      const col = this.clickedCol;
      return (
        <PlantPicker
          show={true}
          handleSelect={(plant, layout) => { this.handlePlantPickerSelection(plant, layout) }}
          handleHide={() => { this.setState({ showPlantPicker: false }) }}
          plantGroups={Plot.plantPickerGroups(row, col, this.state.grid)}
          plot={this.state.grid[row][col]}
          neighbors={Plot.neighbors(row, col, this.state.grid)}
        />
      );
    }
  }

  render() {
    return (
      <Container fluid className="mt-2 p-1">
        {this.renderPlantPicker()}
        <Card className="h-75">
          <Card.Header>
            <GardenControls
              addRowOptions={this.addRowOptions()}
              deleteRowOptions={this.deleteRowOptions()}
              addColOptions={this.addColOptions()}
              deleteColOptions={this.deleteColOptions()}
            />
          </Card.Header>
          <Card.Body
            className="align-content-center m-2 overflow-auto p-0"
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            <GardenGrid
              grid={this.state.grid}
              numRows={this.state.numRows}
              numCols={this.state.numCols}
              handleGridClick={this.handleGridClick}
            />
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Designer;
