import React, { Component } from 'react';
import './App.css';
import Homepage from './views/home/index.js';
import JournalPage from './pages/journal.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KeptSessions from './pages/keptsessions.js';
import AudioRecord from './pages/audiorecord.js';

class App extends Component {
  render() {
    // return (
    //   <Homepage />
    //   // <JournalPage />
    // );
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="audiorecord" element={<AudioRecord />} />
          <Route path="keptsessions" element={<KeptSessions />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;