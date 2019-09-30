import '../App.css';
import '../index.css';
import React from 'react';
import PropTypes from 'prop-types';
import Plant from '../models/Plant';
import Layout from '../models/Layout';
import plantImgSrc from '../images/plantImages';


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

  renderPlants() {
    if (!(this.props.plant)) {
      return null;
    } else {
      const imgSrc = plantImgSrc(this.props.plant.imageName);
      return (
        this.props.layout.cellFilledStates
          .map((filled, i) => {
            // const cellClass = (filled) ? `plant ${this.props.plant.className} bg-90pct-center` : 'bg-90pct-center';
            // return <div className={cellClass} key={i}></div>;
            if (filled) {
              // return <img src={imgSrc} className="plant" alt={this.props.plant.name} key={i}/>
              return <div className="plant"><object data={imgSrc} type="image/svg+xml" key={i}></object></div>;
            } else {
              return <div className="plant" key={i}></div>;
            }
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
        <div
          className="plants"
          style={(this.props.layout) ? this.props.layout.styles : {}}
        >
          {this.renderPlants()}
        </div>
      </button>
    );
  }
}

SquareFootPlot.propTypes = propTypes;

export default SquareFootPlot;