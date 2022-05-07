import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import { Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import Error from './pages/Error';
//import LoginPage from './pages/LoginPage';
import Cookies from 'js-cookie';
import Inbox from './pages/Inbox';
import InvitePage from './pages/InvitePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/home" element = {<Home />} />

        <Route path = "/" element = {<Navigate to="/home" />} />

        <Route path = "/postProfile" element = {<PostPage />} />

        <Route path = "/inbox" element = {<Inbox />} />

        <Route path = "/invitePage" element = {<InvitePage />} />
    
        <Route path = "*" element = {<Error />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
