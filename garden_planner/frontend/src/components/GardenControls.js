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

  btnGroupContainerClass = 'd-flex flex-column m-1 p-0 border border-secondary rounded text-center text-nowrap';
  btnGroupLabelClass = 'badge badge-secondary rounded-0 w-100';

  renderDropdownButton(id, title, options) {
    return (
      <DropdownButton
        id={id}
        title={title}
        disabled={(options.length > 1) ? false : true}
        variant="outline-secondary"
        size="sm"
      >
        {
          options.map((option, i) => {
            return <Dropdown.Item key={i} onSelect={option.handleSelect}>{option.label}</Dropdown.Item>;
          })
        }
      </DropdownButton>
    );
  }

  render() {
    return (
      <ButtonToolbar aria-label="Controls" className="justify-content-center">
        <div className={this.btnGroupContainerClass}>
          <span className={this.btnGroupLabelClass}>Rows</span>
          <ButtonGroup aria-label="Add or delete rows">
            {this.renderDropdownButton('add-row-btn', 'Add', this.props.addRowOptions)}
            {this.renderDropdownButton('delete-row-btn', 'Delete', this.props.deleteRowOptions)}
          </ButtonGroup>
        </div>
        <div className={this.btnGroupContainerClass}>
          <span className={this.btnGroupLabelClass}>Columns</span>
          <ButtonGroup aria-label="Add or delete columns">
            {this.renderDropdownButton('add-col-btn', 'Add', this.props.addColOptions)}
            {this.renderDropdownButton('delete-col-btn', 'Delete', this.props.deleteColOptions)}
          </ButtonGroup>
        </div>
      </ButtonToolbar>
    );
  }
}

GardenControls.propTypes = propTypes;

export default GardenControls;