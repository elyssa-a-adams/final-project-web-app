import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import NavBar from './Snapper/NavBar/navbar';
import Post from './Snapper/Post/post';
import { ListGroup } from 'react-bootstrap';

function App() {
  return (
    <div className='Appbackground'>
      <div>
      < NavBar />
      </div>
      <div>
      <ListGroup style={{backgroundColor: "#0E1428"}}>
      <ListGroup.Item style={{backgroundColor: "#0E1428"}}><Post /></ListGroup.Item>
      <ListGroup.Item style={{backgroundColor: "#0E1428"}}><Post /></ListGroup.Item>
      <ListGroup.Item style={{backgroundColor: "#0E1428"}}><Post /></ListGroup.Item>
    </ListGroup>
      </div>
    </div>
  );
}

export default App;
