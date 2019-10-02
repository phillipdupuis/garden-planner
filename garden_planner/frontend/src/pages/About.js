import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';


function FlatIconCredit({ authorLink, authorTitle, authorLabel }) {
  return (
    <div>
      {'Icons made by '}
      <a href={authorLink} title={authorTitle}>{authorLabel}</a>
      {' from '}
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
  );
}


class About extends React.Component {
  render() {
    return (
    <div class="text-sm">
      <Jumbotron>
        <h5>Design your own garden</h5>
        <p>
          Personalize the size and dimensions, plan out the plants, and get 
          assistance with determining what arrangements work well.
        </p>
        <Button variant="success" href="/">Go to Garden Planner</Button>
      </Jumbotron>
      <Container>
        {/* <div className="my-3 p-3 bg-white rounded shadow-sm"></div> */}
        <h1 className="mt-5">
          About Penny's Garden Planner
        </h1>
        <p>
          Placeholder...fill this in later.
        </p>
        <p>Credit...</p>
        <div className="d-flex flex-column">
          <FlatIconCredit
            authorLabel="Smashicons"
            authorTitle="Smashicons"
            authorLink="https://www.flaticon.com/authors/smashicons"
          />
          <FlatIconCredit
            authorLabel="Freepik"
            authorTitle="Freepik"
            authorLink="https://www.flaticon.com/authors/freepik"
          />
          <FlatIconCredit
            authorLabel="wanicon"
            authorTitle="wanicon"
            authorLink="https://www.flaticon.com/authors/wanicon"
          />
          <FlatIconCredit
            authorLabel="mynamepong"
            authorTitle="mynamepong"
            authorLink="https://www.flaticon.com/authors/mynamepong"
          />
        </div>
      </Container>
    </div>
    );
  }
}

export default About;