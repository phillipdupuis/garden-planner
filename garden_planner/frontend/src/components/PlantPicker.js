import '../App.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Plant from '../models/Plant';


class PlantPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: undefined,
    };
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

  renderOneOption(plant) {
    // let value = option.value;
    // let onClick = option.fcn;
    return (
      <ListGroup.Item
        action
        key={plant.id}
        onClick={() => this.props.handleSelect(plant, plant.defaultLayout())}
      >
        <div className={`${plant.className} bg-icon-right`}>{plant.namePlural}</div>
      </ListGroup.Item>
    );
  }

  renderOptions() {
    return (
      <ListGroup>
        {Plant.allObjects().map(plant => this.renderOneOption(plant))}
      </ListGroup>
    );
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleHide}
        className="h-75"
      >
        <Modal.Header closeButton className="bg-pastel-green">
          Plant Picker
        </Modal.Header>
        <Modal.Body className="overflow-auto">
          <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
            <Tab eventKey="good" title="good">
            </Tab>
            <Tab eventKey="neutral" title="neutral">
            </Tab>
            <Tab eventKey="bad" title="bad" disabled>
            </Tab>
          </Tabs>
          {this.renderOptions()}
        </Modal.Body>
      </Modal>
    );
  }
}

export default PlantPicker;