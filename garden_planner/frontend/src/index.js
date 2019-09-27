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

  // renderHeader() {
  //   return (
  //     <RowsControl
  //       addRowFunction={() => { this.addRow() }}
  //       addColFunction={() => { this.addCol() }}
  //     />
  //   );
  // }

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
        {/* <ButtonGroup className="mx-2" aria-label="Undo and redo">
          {this.renderUndo()}
          <Button variant="outline-secondary" size="sm" className={buttonClass}>
            <img src={redoIcon} />
          </Button>
        </ButtonGroup>
        <Button variant="primary" size="sm" className="ml-auto">Save</Button> */}
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
    squareSize = Math.max(squareSize, 15);
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

  neighbors(row, col) {
    const xvals = [-1, 0, 1].map(v => v + col).filter(x => x >= 0 && x < this.state.numCols);
    const yvals = [-1, 0, 1].map(v => v + row).filter(y => y >= 0 && y < this.state.numRows);
    let neighbors = [];
    for (let y of yvals) {
      for (let x of xvals) {
        if (!(y === row && x === col)) {
          neighbors.push(this.state.grid[y][x]);
        }
      }
    }
    return neighbors.filter(Boolean);
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
        neighbors={this.neighbors(row, col)}
        draggable
        onDragOver={(e) => console.log(e)}
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

  // handleSelectOption(value) {
  //   let gridCopy = this.state.grid.map(row => row.slice());
  //   gridCopy[this.clickedRow][this.clickedCol] = value;
  //   this.clickedRow = null;
  //   this.clickedCol = null;
  //   this.setState({
  //     grid: gridCopy,
  //     showPlantPicker: false,
  //   });
  // }

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

  // plantPickerOptions() {
  //   let options = [];
  //   if (this.state.showPlantPicker) {
  //     let currentItem = this.state.grid[this.clickedRow][this.clickedCol];
  //     // ['carrot', 'peas', 'radish', 'spinach', 'strawberry', 'cat']
  //     console.log('plants', plants())
  //     plants().map(plant => plant.name.toLowerCase())
  //       .filter(item => item !== currentItem)
  //       .forEach(item => {
  //         let fcn = () => this.handleSelectOption(item);
  //         options.push({ value: item, fcn: fcn });
  //       });
  //   }
  //   return options;
  // }

  // handleSelectOption(value) {
  //   let gridCopy = this.state.grid.map(row => row.slice());
  //   gridCopy[this.clickedRow][this.clickedCol] = value;
  //   this.clickedRow = null;
  //   this.clickedCol = null;
  //   this.setState({
  //     grid: gridCopy,
  //     showPlantPicker: false,
  //   });
  // }


  handlePlantPickerSelection(plant, layout) {
    const gridCopy = this.state.grid.map(row => row.slice());
    const plot = gridCopy[this.clickedRow][this.clickedCol];
    Object.assign(plot, { plant: plant, layout: layout });
    console.log('plot', plot);
    console.log('layout', layout);
    console.log('calc layout', plant.defaultLayout());
    this.clickedRow = null;
    this.clickedCol = null;
    this.setState({
      grid: gridCopy,
      showPlantPicker: false,
    });
  }

  renderPlantPicker() {
    // let show = this.state.showPlantPicker;
    // // let options = [];
    // // ['strawberry', 'cat', 'carrot', 'peas', 'two'].forEach(item => {
    // //   let fcn = () => this.handleSelectOption(item);
    // //   options.push({value: item, fcn: fcn});
    // // })
    // const onClose = () => { this.setState({ showPlantPicker: false }) };
    // let options = [];
    // if (this.state.showPlantPicker) {
    //   const currentItem = this.state.grid[this.clickedRow][this.clickedCol];
    // }
    return (
      <PlantPicker
        show={this.state.showPlantPicker}
        handleSelect={(plant, layout) => { this.handlePlantPickerSelection(plant, layout) }}
        handleHide={() => { this.setState({ showPlantPicker: false }) }}
      />
    );
  }

  render() {
    return (
      <Container fluid className="mt-2">
        {this.renderPlantPicker()}
        <Card>
          <Card.Header>{this.renderHeader()}</Card.Header>
          <Card.Body className="align-content-center m-2 overflow-auto">{this.renderBody()}</Card.Body>
        </Card>
      </Container>
    );
  }

  // render() {
  //   return (
  //     <Container fluid className="flex-column m-2">
  //       {this.renderPlantPicker()}
  //       <Container className="align-content-center">
  //         {this.renderHeader()}
  //       </Container>
  //       <Container className="align-content-center overflow-auto">
  //         {this.renderBody()}
  //       </Container>
  //     </Container>
  //   );
  // }

  // render() {
  //   return (
  //     <Container fluid className="mt-2 border">
  //       {this.renderPlantPicker()}
  //       <Row className="border-bottom bg-light p-2 w-100">
  //         <Col>{this.renderHeader()}</Col>
  //       </Row>
  //       <Row className="align-content-center m-2 overflow-auto">
  //         <Col>{this.renderBody()}</Col>
  //       </Row>
  //     </Container>
  //   );
  // }

}

export default View;


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
