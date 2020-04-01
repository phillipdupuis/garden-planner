import '../css/theme.css';
import '../css/plants.css';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Plot from '../models/Plot';


const propTypes = {
  show: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired,
  plantGroups: PropTypes.object.isRequired,
  plot: PropTypes.instanceOf(Plot).isRequired,
  neighbors: PropTypes.arrayOf(
    PropTypes.instanceOf(Plot)
  ).isRequired
};

class PlantPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlantGroup: Object.keys(props.plantGroups)[0],
    };
  }

  renderClearPlotButton() {
    if (this.props.plot.plant) {
      return (
        <Button
          block
          variant="success"
          className="mb-1"
          onClick={() => this.props.handleSelect(null, null)}
        >
          <span>Clear plot</span>
        </Button>
      );
    }
  }

  renderNeighbors() {
    const neighborPlants = this.props.neighbors.map(plot => plot.plant).filter(Boolean);
    if (neighborPlants.length > 0) {
      const getName = (plant) => plant.namePlural.toLowerCase();
      const names = Array.from(new Set(neighborPlants.map(getName))).sort().join(', ');
      return <span className="text-wrap text-sm">Neighbors: {names}</span>;
    }
  }

  renderFilters() {
    const numGroups = Object.keys(this.props.plantGroups).length;
    if (numGroups > 1) {
      const groupNameMap = {
        all: 'All',
        good: 'Compatible',
        neutral: 'Neutral',
        bad: 'Combative'
      };
      const buttonStyle = {
        width: `${Math.floor(96 / numGroups)}%`
      };
      return (
        <div className="mb-2">
          <ToggleButtonGroup
            type="radio"
            name="currentPlantGroupFilter"
            value={this.state.currentPlantGroup}
            onChange={(value) => { this.setState({ currentPlantGroup: value }) }}
            className="bg-light w-100"
          >
            {Object.entries(this.props.plantGroups).map(([group, plantList]) => {
              return (
                <ToggleButton
                  size="sm"
                  className="text-center"
                  variant="outline-success"
                  value={group}
                  key={group}
                  style={buttonStyle}
                >
                  {groupNameMap[group]}
                </ToggleButton>
              )
            })
            }
          </ToggleButtonGroup>
        </div>
      )
    }
  }

  renderPlantList() {
    const sortFunc = (a, b) => a.namePlural.localeCompare(b.namePlural);
    const plants = (this.state.currentPlantGroup) ? this.props.plantGroups[this.state.currentPlantGroup] : [];
    return (
      <ListGroup>
        {plants
          .sort(sortFunc)
          .map(plant => {
            return (
              <ListGroup.Item
                action
                key={plant.id}
                onClick={() => this.props.handleSelect(plant, plant.defaultLayout())}
              >
                <span>
                  {plant.namePlural}
                  <div className={`${plant.className} icon float-right`}></div>
                </span>
              </ListGroup.Item>
            )
          })}
      </ListGroup>
    )
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleHide}
        scrollable
      >
        <Modal.Header closeButton className="bg-pastel-green">
          Plant Picker
        </Modal.Header>
        <Modal.Body>
          {this.renderClearPlotButton()}
          {(this.props.plot.plant) ? <hr /> : null}
          {this.renderNeighbors()}
          {this.renderFilters()}
          {this.renderPlantList()}
        </Modal.Body>
      </Modal>
    );
  }
}

PlantPicker.propTypes = propTypes;

export default PlantPicker;