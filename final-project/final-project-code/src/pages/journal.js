import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import './journal.css';

//This file acts as the journal page.
class JournalPage extends Component {
  constructor(props) {
    let submittedEntriesKeys = Object.keys(localStorage);
    let submittedEntries = [];
    submittedEntriesKeys.map(key => submittedEntries.push(JSON.parse(localStorage.getItem(key))))
    super(props);
    this.state = {
      submittedEntryList: submittedEntries,
      popupBackHome: false,
      popupChangedMind: false,
      popupSave: false,
      popupSaveConfirm: false,
      popupNotSave: false,
      popupNotSaveConfirm: false,
      popupForEmptyEntry: false,
      isPopupDisplayed: false,
    };  
    this.linkRef = React.createRef();  
  } 

  //submits entry by adding entry to local storage
  submitEntry = (savingEntry) => {
    let currEntry = document.getElementById("journal-entry").value;
    let currDate = new Date();
    let month = currDate.getMonth()+1;
    let day = currDate.getDate();
    let year = currDate.getFullYear();
    let entryObject = {};
    //if the user wants to save the entry, it will show up on the kept sessions page and on the monthly calendar
    if (savingEntry === "yes"){
      entryObject = {
        month: month,
        day: day,
        year: year,
        date: this.getDate(),
        entry: currEntry,
        type: "journal entry",
        inKeptSessions: savingEntry
      }
    }
    //if the user doesn't save the entry, it will only show up on the monthly calendar and not on the kept sessions page
    else{
      entryObject = {
        month: month,
        day: day,
        year: year,
        date: this.getDate(),
        entry: currEntry,
        type: "journal entry",
        inKeptSessions: savingEntry
      }
    }
    this.setState((prevState) => ({
      submittedEntryList: [...prevState.submittedEntryList, entryObject]
    }));
    localStorage.setItem("Entry-"+entryObject["date"], JSON.stringify(entryObject));
  }

  //gets today's date
  getDate = () => {
    let currDate = new Date();
    let month = currDate.getMonth()+1;
    let day = currDate.getDate();
    let year = currDate.getFullYear();
    let shownDate = month + "/" + day + "/" + year;
    return shownDate;
  }

  // makes popup appear that asks the user if they're sure that they would like to go back to the home page
  backHome = () => {
    this.setState({popupBackHome: true, isPopupDisplayed: true});
  }
  
  // makes popup appear that mentions that the user is being redirected over to the home page
  confirmBackHome = () => {
    this.setState({popupBackHome: false, isPopupDisplayed: false});
    this.setState({popupChangedMind: true, isPopupDisplayed: true}, () => {
      setTimeout(() => {
        this.setState({popupChangedMind: false, isPopupDisplayed: false});
        if (this.linkRef.current) {
          this.linkRef.current.click();
        }
      }, 3000);
    });
  }

  // removes popup when user decides that they don't want to go back to the home page
  confirmNotBackHome = () => {
    this.setState({popupBackHome: false, isPopupDisplayed: false});
  }

  // either shows popup that mentions that user needs to write up an entry if they haven't done so already
  // or shows popup that asks users if they are sure they would like to save their current entry
  saveYes = () => {
    let currEntry = document.getElementById("journal-entry").value;
    if (currEntry === ""){
      this.setState({popupForEmptyEntry: true, isPopupDisplayed: true}, () => {
        setTimeout(() => {
          this.setState({popupForEmptyEntry: false, isPopupDisplayed: false});
        }, 2000);
      });
    }
    else{
      this.setState({popupSave: true, isPopupDisplayed: true});
    }
  }

  // shows popup that confirms that entry is being saved and redirects user to home page
  saveYesConfirm = () => {
    this.submitEntry("yes");
    this.setState({popupSave: false, isPopupDisplayed: false});
    this.setState({popupSaveConfirm: true, isPopupDisplayed: true}, () => {
      setTimeout(() => {
        this.setState({popupSaveConfirm: false, isPopupDisplayed: false});
        if (this.linkRef.current) {
          this.linkRef.current.click();
        }
      }, 3000);
    });
  }

  // removes popup when user decides to not save the entry
  saveYestoNope = () => {
    this.setState({popupSave: false, isPopupDisplayed: false});
  }

  // either shows popup that mentions that user needs to write up an entry if they haven't done so already
  // or shows popup that asks users if they are sure they would not like to save their current entry
  saveNo = () => {
    let currEntry = document.getElementById("journal-entry").value;
    if (currEntry === ""){
      this.setState({popupForEmptyEntry: true, isPopupDisplayed: true}, () => {
        setTimeout(() => {
          this.setState({popupForEmptyEntry: false, isPopupDisplayed: false});
        }, 2000);
      });
    }
    else{
      this.setState({popupNotSave: true, isPopupDisplayed: true});
    }
  }

  // removes popup when user decides to not make a decision to not save their entry
  saveNotoNope = () => {
    this.setState({popupNotSave: false, isPopupDisplayed: false});
  }

  // shows popup that confirms that entry is not being saved and redirects user to home page
  saveNoConfirm = () => {
    this.submitEntry("no");
    this.setState({popupNotSave: false, isPopupDisplayed: false});
    this.setState({popupNotSaveConfirm: true, isPopupDisplayed: true}, () => {
      setTimeout(() => {
        this.setState({popupNotSaveConfirm: false, isPopupDisplayed: false});
        if (this.linkRef.current) {
          this.linkRef.current.click();
        }
      }, 3000);
    });
  }
  
  render() {
    return (
      <div className="JournalPage">
        <div id="container" className={`${this.state.isPopupDisplayed ? "blurred" : ""}`}>
          <header>
            <div id="Navbar">
              <h1 className="title">Self-Reflection Into the Void</h1>
            </div>
          </header>
          <div id="homepage-body">
            <h2 className="text-date">Date of Your Journal Entry: {this.getDate()}</h2>
            <h3 className="journal-q">Please write what you're feeling below:</h3>
            <textarea aria-label="text area to write journal entry" id="journal-entry" type="text"></textarea>
            <h3 className="journal-q">Would you like to keep your journal entry for later?</h3>
            <div id="save-buttons">
                <button aria-label="button for yes" id="yes-button" type="button" onClick={this.saveYes}>Yes</button>
                <button aria-label="button for no" id="no-button" type="button" onClick={this.saveNo}>No</button>
            </div>
            <div id="back-home">
              <button aria-label="button to go back to the home page" id="back-home-button" onClick={this.backHome} type="button">Take me back home</button>
            </div>
          </div>
        </div>
        <Outlet/>
        {/* popup that asks user if they want to go back to home page */}
        <>
          {this.state.popupBackHome && (
              <div className="costPopup">
                  <p className="popup-text">Are you sure you want to head back to the home page? Your self-reflection session isn't complete yet.</p>
                  <div className="popup-buttons">
                      <button aria-label="button for yes" id="yes-button" onClick={this.confirmBackHome} type="button">Yes</button>
                      <button aria-label="button for no" id="no-button" onClick={this.confirmNotBackHome} type="button">No</button>
                  </div>
              </div>
          )}
        </>
        {/* popup that confirms that user is being redirected back to the home page */}
        <>
          {this.state.popupChangedMind && (
              <div className="costPopup">
                <p className="popup-text">That's okay if you changed your mind. Let's get you back to the home page...</p>
                <Link to="/" ref={this.linkRef} style={{display: "none"}}>
                  <p>redirect</p>
                </Link>
              </div>
          )}
        </>
        {/* popup that asks user if they're sure that they would like to save the current entry */}
        <>
          {this.state.popupSave && (
              <div className="costPopup">
                <p className="popup-text">Are you sure you would like to save this self-reflection session?</p>
                <div className="popup-buttons">
                    <button aria-label="button for yes" id="yes-button" onClick={this.saveYesConfirm} type="button">Yes</button>
                    <button aria-label="button for no" id="no-button" onClick={this.saveYestoNope} type="button">No</button>
                </div>
              </div>
          )}
        </>
        {/* popup that confirms that entry is being saved and user will be redirected to the home page */}
        <>
          {this.state.popupSaveConfirm && (
              <div className="costPopup">
                <p className="popup-text">Saving your self-reflection session and taking you back to the home page in 3...2...1...</p>
                <Link to="/" ref={this.linkRef} style={{display: "none"}}>
                  <p>redirect</p>
                </Link>
              </div>
          )}
        </>
        {/* popup that asks user if they're sure that they don't want to save their current entry */}
        <>
          {this.state.popupNotSave && (
              <div className="costPopup">
                <p className="popup-text">Are you sure you would not like to save this self-reflection session?</p>
                <div className="popup-buttons">
                    <button aria-label="button for yes" id="yes-button" onClick={this.saveNoConfirm} type="button">Yes</button>
                    <button aria-label="button for no" id="no-button" onClick={this.saveNotoNope} type="button">No</button>
                </div>
              </div>
          )}
        </>
        {/* popup that confirms that entry won't be saved and redirects user to the home page */}
        <>
          {this.state.popupNotSaveConfirm && (
              <div className="costPopup">
                <p className="popup-text">Even though you didn't save your session, good job for self-reflecting! :D Your progress will still be tracked on the monthly calendar. Taking you back to the home page in 3... 2... 1...</p>
                <Link to="/" ref={this.linkRef} style={{display: "none"}}>
                  <p>redirect</p>
                </Link>
              </div>
          )}
        </>
        {/* popup that asks user to write something for their entry if text area is empty */}
        <>
          {this.state.popupForEmptyEntry && (
              <div className="costPopup">
                <p className="popup-text">Please write something before submitting your entry. :D</p>
              </div>
          )}
        </>
      </div>
    );
  }
}

export default JournalPage;