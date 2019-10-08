import React from 'react';
import '../css/Shrine.css';
import pennyPic1 from '../images/Penny_1.jpg';
import pennyPic2 from '../images/Penny_2.jpg';
import pennyPic3 from '../images/Penny_3.jpg';
import pennyPic4 from '../images/Penny_4.jpg';
import pennyPic5 from '../images/Penny_5.jpg';
import pennyPic6 from '../images/Penny_6.jpg';


function PennyPic({src, alt}) {
  return (
    <div className="px-2 pb-2">
      <img className="penny-pic" src={src} alt={alt} />
    </div>
  );
}

class Shrine extends React.Component {

  render() {
    return (
      <div className="d-flex flex-column w-100">
        <div className="shrine-header p-2">
          <h5>Penny</h5>
          <p className="m-0">The fun little feline it's named after.</p>
        </div>
        <div className="d-flex flex-wrap mw-100 justify-content-center pt-2">
          <PennyPic src={pennyPic3} alt="Penny pic #1" />
          <PennyPic src={pennyPic4} alt="Penny pic #2" />
          <PennyPic src={pennyPic1} alt="Penny pic #3" />
          <PennyPic src={pennyPic6} alt="Penny pic #4" />
          <PennyPic src={pennyPic2} alt="Penny pic #5" />
          <PennyPic src={pennyPic5} alt="Penny pic #6" />
        </div>
      </div>
    );
  }
}

export default Shrine;