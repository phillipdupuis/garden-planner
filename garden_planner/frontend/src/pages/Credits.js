import React from 'react';
import Container from 'react-bootstrap/Container';


function FlatIconCredit({ authorLink, authorTitle, authorLabel }) {
  return (
    <div>
      <a href={authorLink} title={authorTitle}>{authorLabel}</a>
      {' from '}
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
  );
}

class Credits extends React.Component {
  render() {
    return (
      <Container className="mt-4 flex-column">
        <h5>Plant vector icons:</h5>
        <ul>
          <li>
            <FlatIconCredit
              authorLabel="Smashicons"
              authorTitle="Smashicons"
              authorLink="https://www.flaticon.com/authors/smashicons"
            />
          </li>
          <li>
            <FlatIconCredit
              authorLabel="Freepik"
              authorTitle="Freepik"
              authorLink="https://www.flaticon.com/authors/freepik"
            />
          </li>
          <li>
            <FlatIconCredit
              authorLabel="wanicon"
              authorTitle="wanicon"
              authorLink="https://www.flaticon.com/authors/wanicon"
            />
          </li>
          <li>
            <FlatIconCredit
              authorLabel="mynamepong"
              authorTitle="mynamepong"
              authorLink="https://www.flaticon.com/authors/mynamepong"
            />
          </li>
        </ul>
      </Container>
    );
  }
}

export default Credits;