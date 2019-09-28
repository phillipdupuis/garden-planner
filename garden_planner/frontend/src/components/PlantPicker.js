import '../App.css';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Plant from '../models/Plant';
import Layout from '../models/Layout';


const propTypes = {
  show: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired,
  plantGroups: PropTypes.object.isRequired,
  neighborPlants: PropTypes.arrayOf(
    PropTypes.instanceOf(Plant)
  ).isRequired
}

class PlantPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPlantGroup: Object.keys(props.plantGroups)[0],
    };
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
                <div className={`${plant.className} bg-icon-right`}>{plant.namePlural}</div>
              </ListGroup.Item>
            )
          })}
      </ListGroup>
    )
  }

  renderFilters() {
    if (Object.keys(this.props.plantGroups).length === 1) {
      return null;
    } else {
      const groupNameMap = {all: 'All', good: 'Good with neighbors', neutral: 'Neutral', bad: 'Bad with neighbors'};
      return (
        <div className="mb-2">
          <ToggleButtonGroup
            type="radio"
            name="currentPlantGroupFilter"
            value={this.state.currentPlantGroup}
            onChange={(value) => { this.setState({ currentPlantGroup: value }) }}
            className="bg-light"
          >
            {Object.entries(this.props.plantGroups).map(([group, plantList]) => {
              return (
                <ToggleButton
                  size="sm"
                  className="text-left"
                  variant="outline-secondary"
                  value={group}
                  key={group}
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
          {this.renderFilters()}
          {this.renderPlantList()}
        </Modal.Body>
      </Modal>
    );
  }
}

PlantPicker.propTypes = propTypes;

export default PlantPicker;