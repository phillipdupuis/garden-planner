import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


class About extends React.Component {

  render() {
    return (
    <div>
      <Container className="mt-4">
        <h4>Design your own garden!</h4>
        <hr className="my-4" />
        <p>
          Square-foot gardening is a fun and effective way to grow your own food.  
          It's highly efficient and requires very little space, making it ideal for people who live in urban environments or who have limited mobility.  
          However, it can be difficult for many people to get past the planning phase.
        </p>
        <p>
          Our interactive garden designer is here to help.
          It handles the hard parts for you, like determining seed/seedling arrangements or picking out companion plants.
        </p>
        <Button variant="success" href="/">Go to Garden Designer</Button>
        <hr className="my-4" />
        <h6>Learn more about square-foot gardening</h6>
        <ul>
          <li><a href="https://extension.umaine.edu/publications/2761e/">University of Maine - Gardening in Small Spaces</a></li>
          <li><a href="https://www.ag.ndsu.edu/publications/lawns-gardens-trees/the-facts-of-square-foot-gardening">North Dakota State University</a></li>
          <li><a href="https://hgic.clemson.edu/square-foot-gardening/">Clemson Home and Garden Information Center</a></li>
        </ul>
      </Container>
    </div>
    );
  }
}

export default About;