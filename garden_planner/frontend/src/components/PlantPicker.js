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
  neighborPlants: PropTypes.arrayOf(
    PropTypes.instanceOf(Plant)
  ).isRequired
}

class PlantPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      neighborsFilter: 'good',
    };
    this.plantGroups = {};
  }
  // state = {
  //   plants: undefined,
  //   layouts: undefined,
  //   placeholder: "Loading..."
  // };

  // componentDidMount() {
  //   fetch('/backend/plants/')
  //     .then(response => {
  //       if (response.status !== 200) {
  //         return this.setState({ placeholder: "Something went wrong" });
  //       } else {
  //         return response.json();
  //       }
  //     })
  //     .then(data => this.setState({ plants: data, loaded: true }));
  // }

  // renderOneOption(plant) {
  //   // let value = option.value;
  //   // let onClick = option.fcn;
  //   return (
  //     <ListGroup.Item
  //     action
  //     key={plant.id}
  //     onClick={() => this.props.handleSelect(plant, plant.defaultLayout())}
  //     >
  //     <div className={`${plant.className} bg-icon-right`}>{plant.namePlural}</div>
  //     </ListGroup.Item>
  //     );
  // }

  // renderOptions() {
  //   return (
  //     <ListGroup>
  //     {Plant.allObjects().map(plant => this.renderOneOption(plant))}
  //     </ListGroup>
  //     );
  // }
  getFilterFunction() {
    if (this.props.neighborPlants.length === 0) {
      return (plant) => true;
    }
    else if (this.state.neighborsFilter === 'good') {
      const good = new Set();
      this.props.neighborPlants.forEach(plant => {
        plant.goodNeighborIds.forEach(id => good.add(id));
        plant.badNeighborIds.forEach(id => good.delete(id));
      });
      return (plant) => good.has(plant.id);
    } else if (this.state.neighborsFilter === 'bad') {
      const bad = new Set();
      this.props.neighborPlants.forEach(plant => {
        plant.badNeighborIds.forEach(id => bad.add(id));
      });
      return (plant) => bad.has(plant.id);
    } else {
      const neutral = new Set(Plant.allObjects().map(plant => plant.id));
      this.props.neighborPlants.forEach(plant => {
        plant.goodNeighborIds.forEach(id => neutral.delete(id));
        plant.badNeighborIds.forEach(id => neutral.delete(id));
      });
      return (plant) => neutral.has(plant.id);
    }
  }

  setUpPlantGroups() {
    this.plantGroups = {};
    if (this.props.neighborPlants.length === 0) {
      this.plantGroups['all'] = Plant.allObjects();
    } else {
      const goodIds = new Set();
      const badIds = new Set();
      const neutralIds = new Set(Plant.allObjects().map(plant => plant.id));
      this.props.neighborPlants.forEach(plant => {
        plant.badNeighborIds.forEach(id => {
          goodIds.delete(id);
          neutralIds.delete(id);
          badIds.add(id);
        });
        plant.goodNeighborIds.forEach(id => {
          goodIds.add(id);
          neutralIds.delete(id);
          badIds.add(id);
        });
      });
      if (goodIds.size > 0) {
        this.plantGroups['good'] = Array.from(goodIds).map(id => Plant.getObject(id));
      }
      if (neutralIds.size > 0) {
        this.plantGroups['neutral'] = Array.from(neutralIds).map(id => Plant.getObject(id));
      }
      if (badIds.size > 0) {
        this.plantGroups['bad'] = Array.from(badIds).map(id => Plant.getObject(id));
      }
          console.log('groups', this.plantGroups);
    }
  }

  renderPlantList() {
    const plants = (Object.keys(this.plantGroups).length === 0) ? Object.values(this.plantGroups)[0] : this.plantGroups[this.state.neighborsFilter];
    const filterFunc = this.getFilterFunction();
    const sortFunc = (a, b) => a.namePlural.localeCompare(b.namePlural);
    return (
        <ListGroup>
          {Plant.allObjects()
            .filter(filterFunc)
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
    if (Object.keys(this.plantGroups).length === 1) {
      return null;
    } else {
      console.log('fdasfdsaf');
      console.log(Object.entries(this.plantGroups));
      return (
        <div className="d-flex flex-column w-100">
          Filters
          <ToggleButtonGroup
            vertical
            type="radio"
            name="neighborsFilter"
            value={this.state.neighborsFilter}
            onChange={(value) => { this.setState({ neighborsFilter: value }) }}
            className="bg-light"
          >
            {Object.entries(this.plantGroups).forEach(([group, plantList]) => {
               return (
                 <ToggleButton
                   size="sm"
                   className="text-left"
                   variant="outline-secondary"
                   value={group}
                   key={group}
                 >
                 {group}
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
    this.setUpPlantGroups();
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleHide}
        scrollable
        >
        <Modal.Header closeButton className="bg-pastel-green">
          {this.renderFilters()}
        </Modal.Header>
        <Modal.Body>
          {this.renderPlantList()}
        </Modal.Body>
      </Modal>
      );
  }
}

PlantPicker.propTypes = propTypes;

export default PlantPicker;