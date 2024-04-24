import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Snapper from './Snapper';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import OpeningPage from './Users/OpeningPage';
import Profile from './Users/Profile';
import UserTable from './Users/Table';
import Search from './Snapper/Search/search';
import OtherUserProfile from './Users/OtherUserProfile';
import UsersList from './Users/UsersList';

function App() {
  return (
    <HashRouter>
          <div className='Appbackground'>
          <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home/*" element={<Snapper />} />
        <Route path="/Opening/*" element={<OpeningPage />} />
        <Route path="/Profile/" >
        <Route path=":username/" element={<OtherUserProfile />} />
        <Route path=":username/Followers" element={<UsersList type="followers"/>} />
        <Route path=":username/Following" element={<UsersList type="following"/>} />
        <Route path="" element={<Profile />} />
        </Route>
        <Route path="/Search/*" element={<Search />} />
        <Route path="/Users/*" element={<UserTable />} />
      </Routes>
    </div>
  </HashRouter>
  );
}

export default App;
