import React, { Component } from 'react';
import './App.css';
import Homepage from './pages/index.js';
import JournalPage from './pages/journal.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KeptSessions from './pages/keptsessions.js';
// import AudioRecord from './pages/audiorecord.js';

const ROUTER_BASENAME = process.env.REACT_APP_ROUTER_BASENAME;

class App extends Component {
  render() {
    // created routes to different pages in the app, including home page, journal page, and kept sessions page
    return (
      <Router basename={"/pui-homework-template-advanced"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="journal" element={<JournalPage />} />
          {/* <Route path="audiorecord" element={<AudioRecord />} /> */}
          <Route path="keptsessions" element={<KeptSessions />} />
        </Routes>
      </Router>
    );
  }
}

export default App;