import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
// import '../../App.css';
// This file acts as the homepage for the website.
class AudioRecord extends Component {
  // Created state properties listCart, rolls, searchedRolls, and searched to keep track of search functionality, sort functionality, and cart functionality
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