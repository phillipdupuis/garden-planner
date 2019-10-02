import '../App.css';
import '../css/GardenControls.css';
import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const dropdownOptionPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired
});

const propTypes = {
  addRowOptions: PropTypes.arrayOf(dropdownOptionPropTypes).isRequired,
  deleteRowOptions: PropTypes.arrayOf(dropdownOptionPropTypes).isRequired,
  addColOptions: PropTypes.arrayOf(dropdownOptionPropTypes).isRequired,
  deleteColOptions: PropTypes.arrayOf(dropdownOptionPropTypes).isRequired
};

class GardenControls extends React.Component {

  static renderDropdownButton(id, title, options) {
    return (
      <DropdownButton
        id={id}
        title={title}
        disabled={(options.length > 1) ? false : true}
        variant="outline-secondary"
        size="sm"
      >
        {GardenControls.renderDropdownItems(options)}
      </DropdownButton>
    );
  }

  static renderDropdownItems(options) {
    return (
      options.map((option, i) => {
        return <Dropdown.Item key={i} onSelect={option.handleSelect}>{option.label}</Dropdown.Item>;
      })
    );
  }

  render() {
    return (
      <ButtonToolbar aria-label="Controls" className="justify-content-center">
        <div className="d-flex flex-column m-1 p-0 border border-secondary rounded text-center text-nowrap">
          <span className="badge badge-secondary rounded-0 w-100">Rows</span>
          <ButtonGroup aria-label="Add or delete rows">
            {GardenControls.renderDropdownButton('add-row-btn', 'Add', this.props.addRowOptions)}
            {GardenControls.renderDropdownButton('delete-row-btn', 'Delete', this.props.deleteRowOptions)}
          </ButtonGroup>
        </div>
        <div className="d-flex flex-column m-1 p-0 border border-secondary rounded text-center text-nowrap">
          <span className="badge badge-secondary rounded-0 w-100">Columns</span>
          <ButtonGroup aria-label="Add or delete columns">
            {GardenControls.renderDropdownButton('add-col-btn', 'Add', this.props.addColOptions)}
            {GardenControls.renderDropdownButton('delete-col-btn', 'Delete', this.props.deleteColOptions)}
          </ButtonGroup>
        </div>
      </ButtonToolbar>
    );
  }
}

GardenControls.propTypes = propTypes;

export default GardenControls;