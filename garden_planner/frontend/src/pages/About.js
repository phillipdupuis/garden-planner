import React from 'react';
import Container from 'react-bootstrap/Container';


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
      <Container>
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
    );
  }
}

export default About;