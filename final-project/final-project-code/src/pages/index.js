import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import '../App.css';
import Calendar from './homepage_components/calendar.js';
import './index.css';

// This file acts as the homepage for the website.
class Homepage extends Component {
  constructor(props) {
    super(props);
    let entryObjectOne = {
      month: "11",
      day: "23",
      year: "2024",
      date: "11/23/2024",
      entry: "hi, this is the first journal entry that is being displayed in the kept sessions page. This entry is for demonstration purposes only. Please don't try to delete this entry. Try to delete an entry that you have created.",
      type: "journal entry",
      inKeptSessions: "no"
    }
    let entryObjectTwo = {
      month: "11",
      day: "25",
      year: "2024",
      date: "11/25/2024",
      entry: "hi, this is the second journal entry but it's not being displayed in the kept sessions page",
      type: "journal entry",
      inKeptSessions: "no"
    }
    let entryObjectThree = {
      month: "12",
      day: "01",
      year: "2024",
      date: "12/01/2024",
      entry: "Hi, this is the second journal entry that is being displayed in the kept sessions page. This entry is for demonstration purposes only. Please don't try to delete this entry. Try to delete an entry that you have created.",
      type: "journal entry",
      inKeptSessions: "no"
    }
    localStorage.setItem("Entry-"+entryObjectThree["date"], JSON.stringify(entryObjectThree));
    localStorage.setItem("Entry-"+entryObjectTwo["date"], JSON.stringify(entryObjectTwo));
    localStorage.setItem("Entry-"+entryObjectOne["date"], JSON.stringify(entryObjectOne));
    let submittedEntriesKeys = Object.keys(localStorage);
    let submittedEntries = [];
    submittedEntriesKeys.map(key => submittedEntries.push(JSON.parse(localStorage.getItem(key))))
    this.state = {
      submittedEntries: submittedEntries,
      popupForExistingEntry: false,
      headToJournal: false,
      isPopupDisplayed: false,
    };   
    this.linkRef = React.createRef(); 
  } 

  // gets today's date
  getDate = () => {
    let currDate = new Date();
    let month = currDate.getMonth()+1;
    let day = currDate.getDate();
    let year = currDate.getFullYear();
    let shownDate = month + "/" + day + "/" + year;
    return shownDate;
  }

  // checks to see if there is a journal entry that already exists for today's date
  // if it exists, it makes a popup appear that prevents the user from creating another entry for the same day
  // if it doesn't exist, it redirects user to the page where they can create a journal entry 
  ifEntryAlreadyExists = () => {
    if (localStorage.getItem("Entry-"+this.getDate())){
      this.setState({popupForExistingEntry: true, isPopupDisplayed: true}, () => {
        setTimeout(() => {
          this.setState({popupForExistingEntry: false, isPopupDisplayed: false});
        }, 3000);
      });
    }
    else{
      this.setState({headToJournal: true}, () => {
        setTimeout(() => {
          if (this.linkRef.current) {
            this.linkRef.current.click();
          }
          this.setState({headToJournal: false});
        }, 100);
      });
    }
  }

  render() {
    return (
      <div className="Homepage">
        <div className={`${this.state.isPopupDisplayed ? "blurred" : ""}`}>
          <div id="Navbar">
            <h1 className="title">Self-Reflection Into the Void</h1>
            <Link id='link-kept-sessions' to="/keptsessions">
              <button aria-label="access kept sessions page" id="kept-sessions-button" type="button">Your Kept Sessions</button>
            </Link>
          </div>
          <div id="homepage-body">
            <h2 className="self-reflect-text">How would you like to self-reflect today?</h2>
            <div id="reflection-buttons">
                <button aria-label="button for journaling" id="journal-button" onClick={this.ifEntryAlreadyExists} type="button">Journal</button>
                <button aria-label="button for audio recording" id="audio-button" type="button">Audio Record</button>
            </div>
            <div id="monthly-calendar">
                <h2 className="self-reflect-text">Your Monthly Calendar to Document Your Self-Care Journey</h2>
                <div className="calendar">
                  <Calendar />
                </div>
            </div>
          </div>
        </div>
        {/* code below for popup that appears if a journal entry already exists for today's date */}
        <>
          {this.state.popupForExistingEntry && (
              <div className="costPopup">
                <p className="popup-text">You have already written an entry for today. Come back another day to self-reflect</p>
              </div>
          )}
        </>
        {/* code that redirects user to journal page if journal entry doesn't already exist */}
        <>
          {this.state.headToJournal && (
              <div>
                <Link to="/journal" ref={this.linkRef} style={{display: "none"}}>
                  <p>redirect</p>
                </Link>
              </div>
          )}
        </>
        <Outlet/>
      </div>
    );
  }
}

export default Homepage;