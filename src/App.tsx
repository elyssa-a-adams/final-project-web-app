import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Snapper from './Snapper';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import OpeningPage from './Users/OpeningPage';
import CreatePostPage from './Snapper/Post/NewPost';
import Profile from './Users/Profile';
import UserTable from './Users/Table';

function App() {
  return (
    <HashRouter>
          <div className='Appbackground'>
          <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home/*" element={<Snapper />} />
        <Route path='/NewPost/*' element={<CreatePostPage />} />
        <Route path="/Opening/*" element={<OpeningPage />} />
        <Route path="/Profile/*" element={<Profile />} />
        <Route path="/Users/*" element={<UserTable />} />
      </Routes>
    </div>
  </HashRouter>
  );
}

export default App;
