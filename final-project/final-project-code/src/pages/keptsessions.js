import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import KeptSessionEntry from './keptsessionentry';
// import '../../App.css';
// This file acts as the homepage for the website.
class KeptSessions extends Component {
  // Created state properties listCart, rolls, searchedRolls, and searched to keep track of search functionality, sort functionality, and cart functionality
  constructor(props) {
    let submittedEntriesKeys = Object.keys(localStorage);
    let submittedEntries = [];
    // deserialized a JSON to cart item instances using JSON.parse()
    submittedEntriesKeys.map(key => submittedEntries.push(JSON.parse(localStorage.getItem(key))))
    console.log("here we go");
    console.log(submittedEntries);
    super(props);
    this.state = {
      submittedEntryList: [...submittedEntries],
    //   let searchedList = [...this.state.searchedRolls];
    };        
  } 

  handleDataFromEntry = (data) => {
    this.setState({submittedEntryList: data});
  }
  
  render() {
    return (
      <div className="JournalPage">
        <div id="container">
          <header>
          </header>
          <div id="Navbar">
            <h1>Self-Reflection Into the Void</h1>
          </div>
          <div id="homepage-body">
            <h1>Your Kept Self-Reflection Sessions</h1>
            <div id="entries-list">
                {this.state.submittedEntryList.length > 0 ? this.state.submittedEntryList.map((option, ind) => {
                    return (
                        <KeptSessionEntry sendDataToKeptSessions={this.handleDataFromEntry} key={ind} date={option["date"]} entry={option["entry"]} type={option["type"]}/>
                    ); }) : (
                      <p id="no-match">No entries!</p>
                    )   
                }
            </div>
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

export default KeptSessions;