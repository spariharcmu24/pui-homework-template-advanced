import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import KeptSessionEntry from './kept_sessions_page_components/keptsessionentry.js';
import './keptsessions.css';

// This file acts as the Kept Sessions page
class KeptSessions extends Component {
  constructor(props) {
    let submittedEntriesKeys = Object.keys(localStorage);
    let submittedEntries = [];
    submittedEntriesKeys.map(key => submittedEntries.push(JSON.parse(localStorage.getItem(key))))
    let keptListEntries = [];
    for (let i = 0; i < submittedEntries.length; i++){
      let currEntry = submittedEntries[i];
      if (currEntry["inKeptSessions"] === "yes"){
        keptListEntries.push(currEntry);
      }
    }
    super(props);
    this.state = {
      submittedEntryList: [...keptListEntries],
      isPopupDisplayed: false,
    };        
  } 

  // updates the list of sessions that are being saved, especially if user decides to remove an entry from the list of kept sessions
  handleDataFromEntry = (data) => {
    this.setState({submittedEntryList: data});
  }
  
  // helps to blur out the page when a popup appears
  handlePopupInfo = (popupInfo) => {
    this.setState({isPopupDisplayed: popupInfo})
  }
  
  render() {
    return (
      <div className="JournalPage">
        <div>
          <header>
            <div className={`${this.state.isPopupDisplayed ? "blurred" : ""}`}>
              <h1 className="title">Self-Reflection Into the Void</h1>
            </div>
          </header>
          <div id="homepage-keptsessions-body">
            <h2 className={`text-session-title ${this.state.isPopupDisplayed ? "blurred" : ""}`}>Your Kept Self-Reflection Sessions</h2>
            <div id="entries-list">
                {this.state.submittedEntryList.length > 0 ? this.state.submittedEntryList.map((option, ind) => {
                    return (
                        <KeptSessionEntry sendPopupInfoToKeptSessions={this.handlePopupInfo} sendDataToKeptSessions={this.handleDataFromEntry} key={ind} date={option["date"]} entry={option["entry"]} type={option["type"]}/>
                    ); }) : (
                      <h3 id="no-match">No entries have been saved!</h3>
                    )
                }
            </div>
            <div id="back-home" className={`${this.state.isPopupDisplayed ? "blurred" : ""}`}>
              <Link to="/">
                <button aria-label="go back to home page" id="back-home-button" type="button">Take me back home</button>   
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