import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import '../../App.css';
import Calendar from '../../pages/calendar';
import './index.css';

// This file acts as the homepage for the website.
class Homepage extends Component {
  // Created state properties listCart, rolls, searchedRolls, and searched to keep track of search functionality, sort functionality, and cart functionality
  constructor(props) {
    super(props);
    this.state = {
    };    
  } 

  render() {
    return (
      <div className="Homepage">
        <div id="container">
          <header>
          </header>
          <div id="Navbar">
            <h1 className="title">Self-Reflection Into the Void</h1>
            <Link to="/keptsessions">
              <button id="kept-sessions-button" type="button">Your Kept Sessions</button>
            </Link>
          </div>
          <div id="homepage-body">
            <p>How would you like to self-reflect today?</p>
            <div id="reflection-buttons">
                <Link to="/journal">
                  <button type="button">Journal</button>
                </Link>
                <Link to="/audiorecord">
                  <button type="button">Audio Record</button>
                </Link>
            </div>
            <div id="monthly-calendar">
                <p>Your Monthly Calendar to Document Your Self-Care Journey</p>
                <Calendar />
            </div>
          </div>
        </div>
        <Outlet/>
      </div>
    );
  }
}

export default Homepage;