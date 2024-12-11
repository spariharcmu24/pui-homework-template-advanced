import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";

class AudioRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };    
  } 
  
  render() {
    return (
      <div className="JournalPage">
        <div id="container">
          <header>
          </header>
          <div id="Navbar">
            <p>Self-Reflection Into the Void</p>
          </div>
          <div id="homepage-body">
            <div id="back-home">
              <Link to="/">
                <button type="button">Take me back home</button>   
              </Link>    
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    );
  }
}

export default AudioRecord;