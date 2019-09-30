import '../App.css';
import '../index.css';
import '../images/plants.css';
import './SquareFootPlot.css';
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
      const gridCellStyle = (row, col) => {return {gridArea: `${row + 1} / ${col + 1} / auto / auto`}};
      return (
        this.props.layout.fill.map(([row, col], i) => {
          return (
            <div
              className="plant"
              style={gridCellStyle(row, col)}
              key={i}
            >
              <div className={`bg ${this.props.plant.className}`}>
              </div>
            </div>
          );
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
          style={(this.props.layout) ? this.props.layout.styles : null}
        >
          {this.renderPlants()}
        </div>
      </button>
    );
  }
}

SquareFootPlot.propTypes = propTypes;

export default SquareFootPlot;


// so my desired layout is:
//   <plot, this is the container of a fixed size, className="plot">
//     <plants styles=layout.styles className="plants">
//       <plant>
//         <bg></bg>
//       </plant>
//       <plant>
//         <bg></bg>
//       </plant>
//       ...
//     </plants>
//   </plot>

// So we have:

// The board/container <div>:
//     #board {
//         position: relative;
//         width: 50vw;
//         height: 50vw;
//         min-width: 300px;
//         min-height: 300px;
//         overflow: hidden;
//         border: 12px solid #6D5720;
//         border-radius: 12px;
//     }

//     The plants grid <div>:
//         #plants {
//             z-index: 30;
//         }
//         #garden, #plants, #soil, #overlay {
//             display: grid;
//             grid-template-columns: 20% 20% 20% 20% 20%;
//             grid-template-rows: 20% 20% 20% 20% 20%;
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//         }

//         The individual plant <div>s:
//             Each has a style indicating grid location.
//             Format is style="grid-area: <row> / <col> / auto / auto;" (where row & col start at 1, not 0)
//             Each has class "plant <plantName>"
//             .plant, .treatment {
//                 position: relative;
//                 width: 100%;
//                 height: 100%;
//                 overflow: hidden;
//             }

//             The child <div> with class="bg":
//                 It inherits the parent's "plant <plantName>" class. 
//                 So the class attributes end up being something like:
//                 .plant.carrot .bg {
//                     background-image: url(../images/carrots.svg);
//                 }
//                 .plant .bg, .treatment .bg {
//                     width: 100%;
//                     height: 100%;
//                     background-position: left top;
//                     background-size: calc(10vw - 4px);
//                 }

//     The soil grid <div>:
//         #soil {
//             background-color: #523D1F;
//             overflow: hidden;
//         }
//         #garden, #plants, #soil, #overlay {
//             display: grid;
//             grid-template-columns: 20% 20% 20% 20% 20%;
//             grid-template-rows: 20% 20% 20% 20% 20%;
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//         }

//         The plot <div>s:
//             .plot {
//                 width: 100%;
//                 height: 100%;
//                 background-color: #6F532A;
//                 background-color: #836B32;
//                 background-image: url(../images/dirt.svg);
//                 background-size: calc(10vw - 4px);
//             }

