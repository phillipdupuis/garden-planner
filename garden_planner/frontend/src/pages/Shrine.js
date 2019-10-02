import React from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import '../css/Shrine.css';
import pennyPic1 from '../images/Penny_1.jpg';
import pennyPic2 from '../images/Penny_2.jpg';
import pennyPic3 from '../images/Penny_3.jpg';
import pennyPic4 from '../images/Penny_4.jpg';
import pennyPic5 from '../images/Penny_5.jpg';


class Shrine extends React.Component {

  render() {
    return (
      <Card>
        <Card.Header as="h5">Penny</Card.Header>
        <Card.Body className="bg-dark">
          <Carousel>
            <Carousel.Item><img src={pennyPic3} alt="Penny pic #1" /></Carousel.Item>
            <Carousel.Item><img src={pennyPic4} alt="Penny pic #2" /></Carousel.Item>
            <Carousel.Item><img src={pennyPic1} alt="Penny pic #3" /></Carousel.Item>
            <Carousel.Item><img src={pennyPic2} alt="Penny pic #4" /></Carousel.Item>
            <Carousel.Item><img src={pennyPic5} alt="Penny pic #5" /></Carousel.Item>
          </Carousel>
        </Card.Body>
      </Card>
    );
  }
}

export default Shrine;