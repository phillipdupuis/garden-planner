import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import PlantPicker from './components/PlantPicker';
import SquareFootPlot from './components/SquareFootPlot';
import undoIcon from './images/undo.svg';
import redoIcon from './images/redo.svg';
import Header from './components/Header.js';
import Plant from './models/Plant';
import Layout from './models/Layout';
import Plot from './models/Plot';


class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numRows: 4,
      numCols: 4,
      grid: Array(4).fill().map(row => new Array(4).fill().map(col => new Plot())),
      showPlantPicker: false,
    };
    this.addRow = this.addRow.bind(this);
    this.handleGridClick = this.handleGridClick.bind(this);
    this.clickedRow = null;
    this.clickedCol = null;
    this.history = [];
  }

  componentDidMount() {
    Plant.loadObjectsFromApi();
    Layout.loadObjectsFromApi();
  }

  renderUndo() {
    if (this.history.length === 0) {
      return <Button variant="outline-secondary" className="disabled" disabled><img src={undoIcon} /></Button>;
    } else {
      let undoFcn = () => { let g = this.history.pop(); console.log('yaboii', g); this.setState({ grid: g }) };
      return <Button variant="outline-secondary" onClick={() => { this.undo() }}><img src={undoIcon} /></Button>;
    }
  }

  undo() {
    let g = this.history.pop();
    this.setState((state) => {
      return {
        grid: g,
      }
    });
  }

  renderHeader() {
    const buttonClass = "mr-0";
    return (
      <ButtonToolbar aria-label="Controls">
        <ButtonGroup className="mx-2" aria-label="Add rows and columns">
          <Button variant="outline-success" size="sm" className={buttonClass} onClick={() => { this.addRow() }}>
            Add Row
          </Button>
          <Button variant="outline-success" size="sm" className={buttonClass} onClick={() => { this.addCol() }}>
            Add Column
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  renderBody() {
    return (
      <div>
        <div id="gridContainer" style={this.gridContainerDynamicStyles()}>
          <div id="grid" style={this.gridDynamicStyles()}>
            {this.gridSquares()}
          </div>
        </div>
      </div>
    );
  }

  gridSquares() {
    let squares = [];
    for (let row = 0; row < this.state.numRows; row++) {
      for (let col = 0; col < this.state.numCols; col++) {
        squares.push(this.renderSquare(row, col));
      }
    }
    return squares;
  }

  gridContainerDynamicStyles() {
    let unit, squareSize;
    console.log('windowheight', window.innerHeight);
    console.log('windowwidth', window.innerWidth);
    if ((window.innerHeight > window.innerWidth) || (this.state.numCols > this.state.numRows)) {
      unit = 'vw';
      squareSize = Math.floor(70 / this.state.numCols);
    } else {
      unit = 'vh';
      squareSize = Math.floor(70 / this.state.numRows);
    }
    squareSize = Math.max(squareSize, 23);
    return {
      width: `${this.state.numCols * squareSize}${unit}`,
      height: `${this.state.numRows * squareSize}${unit}`,
    };
  }

  gridDynamicStyles() {
    return {
      gridTemplateRows: `repeat(${this.state.numRows}, 1fr)`,
      gridTemplateColumns: `repeat(${this.state.numCols}, 1fr)`,
    }
  }

  renderSquare(row, col) {
    const id = `r${row}c${col}`
    const plot = this.state.grid[row][col];
    return (
      <SquareFootPlot
        key={id}
        id={id}
        plant={plot.plant}
        layout={plot.layout}
        onClick={() => { this.handleGridClick(row, col) }}
      />
    );
  }

  getGridCopy() {
    return this.state.grid.map(row => row.slice());
  }

  handleGridClick(row, col) {
    this.clickedRow = row;
    this.clickedCol = col;
    this.setState({ showPlantPicker: true });
  }

  addRow() {
    // let gridCopy = this.state.grid.map(row => row.slice());
    // this.history.push(gridCopy);
    console.log('history', this.history);
    this.setState((state) => {
      return {
        numRows: state.numRows + 1,
        grid: state.grid.concat([new Array(state.numCols).fill().map(col => new Plot())]),
      }
    });
  }

  delRow(rowNum) {
    this.setState((state) => {
      return {
        numRows: state.numRows - 1,
        grid: state.grid.splice(rowNum, 1),
      }
    });
  }

  addCol() {
    this.setState((state) => {
      return {
        numCols: state.numCols + 1,
        grid: state.grid.map(row => row.slice().concat([new Plot()])),
      }
    })
  }

  handlePlantPickerSelection(plant, layout) {
    const gridCopy = this.state.grid.map(row => row.slice());
    const plot = gridCopy[this.clickedRow][this.clickedCol];
    Object.assign(plot, { plant: plant, layout: layout });
    this.clickedRow = null;
    this.clickedCol = null;
    this.setState({
      grid: gridCopy,
      showPlantPicker: false,
    });
  }

  renderPlantPicker() {
    if (this.state.showPlantPicker === false) {
      return null;
    } else {
      // Determine what plants are adjacent to the selected plot...this influences the search results.
      const plotRow = this.clickedRow;
      const plotCol = this.clickedCol;
      const validLoc = (row, col) => (
        row >= 0
        && row < this.state.numRows
        && col >= 0
        && col < this.state.numCols
        && `${row}_${col}` !== `${plotRow}_${plotCol}`
      );
      const getPlantAtLoc = (row, col) => this.state.grid[row][col].plant;
      const neighborPlants = [];
      [plotRow - 1, plotRow, plotRow + 1].forEach(row => {
        [plotCol - 1, plotCol, plotCol + 1].forEach(col => {
          if (validLoc(row, col) && getPlantAtLoc(row, col)) {
            neighborPlants.push(getPlantAtLoc(row, col));
          }
        });
      });
      const plantGroups = this.state.grid[plotRow][plotCol].plantPickerOptionGroups(neighborPlants);
      return (
        <PlantPicker
          show={true}
          handleSelect={(plant, layout) => { this.handlePlantPickerSelection(plant, layout) }}
          handleHide={() => { this.setState({ showPlantPicker: false }) }}
          plantGroups={plantGroups}
          neighborPlants={neighborPlants}
        />
      );
    }
  }

  render() {
    return (
      <Container fluid className="mt-2 p-1">
        {this.renderPlantPicker()}
        <Card className="h-75">
          <Card.Header>{this.renderHeader()}</Card.Header>
          <Card.Body
            className="align-content-center m-2 overflow-auto p-0"
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            {this.renderBody()}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default View;

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
