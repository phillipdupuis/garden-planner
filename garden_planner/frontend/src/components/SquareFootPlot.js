import '../App.css';
import '../index.css';
import React from 'react';


class SquareFootPlot extends React.Component {
    constructor(props) {
        super(props);
    }

    cells() {
        if (!(this.props.plant)) {
            return '';
        } else {
            const filledClass = this.props.plant.className;
            return (
                this.props.layout.cellFilledStates()
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
                    {this.cells()}
                </div>
            </button>
        );
    }
}


export default SquareFootPlot;