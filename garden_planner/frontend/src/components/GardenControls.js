import '../App.css';
import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const propTypes = {
	handleAddRow: PropTypes.func.isRequired,
	handleAddCol: PropTypes.func.isRequired,
	deleteRowOptions: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			handleSelect: PropTypes.func.isRequired
		})
	).isRequired,
	deleteColOptions: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			handleSelect: PropTypes.func.isRequired
		})
	).isRequired,
	numRows: PropTypes.number.isRequired,
	numCols: PropTypes.number.isRequired
};

class GardenControls extends React.Component {

  render() {
    const buttonClass = "mr-0";
    return (
      <ButtonToolbar aria-label="Controls">
        <ButtonGroup className="mx-2" aria-label="Add rows and columns">
          <Button
          	variant="outline-success"
          	size="sm"
          	className={buttonClass}
          	onClick={this.props.handleAddRow}
          >
            Add Row
          </Button>
          <Button
          	variant="outline-success"
          	size="sm"
          	className={buttonClass}
          	onClick={this.props.handleAddCol}
          >
            Add Column
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mx-2" aria-label="Delete rows and columns">
        	<DropdownButton
        		id="delete-row-btn"
        		title="Delete row"
        		variant="outline-success"
        		size="sm"
        	>
        		{
        			this.props.deleteRowOptions.map((option, i) => {
        				return (
        					<Dropdown.Item key={i} onSelect={option.handleSelect}>
        						{option.name}
        					</Dropdown.Item>
        				);
        			})
        		}
        	</DropdownButton>
        	<DropdownButton
        		id="delete-col-btn"
        		title="Delete column"
        		variant="outline-success"
        		size="sm"
        	>
        		{
        			this.props.deleteColOptions.map((option, i) => {
        				return (
        					<Dropdown.Item key={i} onSelect={option.handleSelect}>
        						{option.name}
        					</Dropdown.Item>
        				);
        			})
        		}
        	</DropdownButton>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}

GardenControls.propTypes = propTypes;

export default GardenControls;