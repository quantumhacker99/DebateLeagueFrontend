import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';

import Error from './pages/Error';
import LoginPage from './pages/LoginPage';
import { Authorize } from './components/AuthorizeComponent';
import PostPage from './pages/PostLage';
import Inbox from './pages/Inbox';
import InvitePage from './pages/InvitePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/home" element = {Authorize.checkCredentials()? <Home /> : <Navigate to = "/login" />} />

        <Route path = "/" element = {Authorize.checkCredentials()?<Navigate to="/home"/> : <Navigate to = "/login" />} />

        <Route path = "/postProfile" element = {Authorize.checkCredentials()? <PostPage /> : <Navigate to = "/login" />} />

        <Route path = "/inbox" element = {Authorize.checkCredentials()? <Inbox /> : <Navigate to = "/login" />} />

        <Route path = "/login" element = {Authorize.checkCredentials()? <Navigate to = "/home" /> : <LoginPage />} />

        <Route path = "/invitePage" element = {Authorize.checkCredentials()? <InvitePage /> : <Navigate to = "/login" />} />

        
        {/* <LoginPage /> : <Navigate to = "/login" />} />  */}

        <Route path = "*" element = {<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
