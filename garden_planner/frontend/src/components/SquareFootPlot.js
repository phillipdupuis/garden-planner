import '../App.css';
import '../index.css';
import React from 'react';
import PropTypes from 'prop-types';
import Plant from '../models/Plant';
import Layout from '../models/Layout';


const propTypes = {
    id: PropTypes.string.isRequired,
    plant: PropTypes.instanceOf(Plant),
    layout: PropTypes.instanceOf(Layout),
    onClick: PropTypes.func.isRequired
};

class SquareFootPlot extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCells() {
        if (!(this.props.plant)) {
            return '';
        } else {
            const filledClass = this.props.plant.className;
            return (
                this.props.layout.cellFilledStates
                .map(filled => (filled) ? filledClass : '')
                .map((className, idx) => {
                    return <div className={`${className} bg-90pct-center`} key={idx}></div>;
                })
            );
        }
    }

    render() {
        return (
            <button
                className="plot"
                id={this.props.id}
                onClick={this.props.onClick}
            >
                <div style={(this.props.layout) ? this.props.layout.styles : {}}>
                    {this.renderCells()}
                </div>
            </button>
        );
    }
}

SquareFootPlot.propTypes = propTypes;

export default SquareFootPlot;