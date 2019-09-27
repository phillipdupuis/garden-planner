import React from 'react';
import logo from './logo.svg';
import Header from './components/Header.js';
import View from './index.js';
import ListGroup from 'react-bootstrap/ListGroup';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



// class Thingy extends React.Component {

//     state = {
//         data: '',
//         loaded: false,
//         placeholder: "Loading..."
//     };

//     componentDidMount() {
//         fetch('/backend/plants/')
//             .then(response => {
//                 if (response.status !== 200) {
//                     return this.setState({ placeholder: "Something went wrong" });
//                 } else {
//                     return response.json();
//                 }
//             })
//             .then(data => this.setState({ data: data, loaded: true }));
//     }

//     renderOne(plant) {
//       return (
//         <ListGroup.Item
//           key={plant.id}
//         >
//         {plant.name}
//         </ListGroup.Item>
//       );
//     }

//     render() {
//         const { data, loaded, placeholder } = this.state;
//         if (!loaded) {
//           return <p>{placeholder}</p>;
//         } else {
//           return (
//             <ListGroup>
//               {this.state.data.map(plant => this.renderOne(plant))}
//             </ListGroup>
//           );
//         }
//     }
// }


// function App() {
//   return (
//     <div className="App">
//       <View />
//     </div>
//   );
// }

function App() {
  return (
    <div>
      <Header />
      <View />
    </div>
  );
}

export default App;
