import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import './keptsessionentry.css';


class KeptSessionEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
        maybeDeletePopup: false,
        confirmDeletePopup: false,
        isPopupDisplayed: false,
    };
    this.props.sendPopupInfoToKeptSessions(false);
    this.linkRef = React.createRef();       
  } 

  // updates entry so that it doesn't appear in the kept sessions page but still has a purple heart icon for corresponding date on monthly calendar on home page
  // sends updated list of entries over to keptsessions.js
  removeItem = (date) => {
    let currEntry = JSON.parse(localStorage.getItem("Entry-"+date));
    currEntry["inKeptSessions"] = "no";
    localStorage.setItem("Entry-"+date, JSON.stringify(currEntry));
    let listOfEntryKeys = Object.keys(localStorage);
    let listOfEntryItems = [];
    listOfEntryKeys.map(key => listOfEntryItems.push(JSON.parse(localStorage.getItem(key))))
    this.props.sendDataToKeptSessions(listOfEntryItems);
  }

  // shows popup that asks user if they are sure they would like to "delete" the entry from their kept sessions list
  // sends info to keptsessions.js to blur out page when popup appears
  deleteMaybe = () => {
    this.setState({maybeDeletePopup: true, isPopupDisplayed: true});
    this.props.sendPopupInfoToKeptSessions(true);
  }

  // shows popup that confirms that entry will be removed and redirects user to home page
  deleteConfirm = () => {
    this.setState({maybeDeletePopup: false, isPopupDisplayed: false});
    this.setState({confirmDeletePopup: true, isPopupDisplayed: true}, () => {
        setTimeout(() => {
          this.removeItem(this.props.date);
          }, 2000);
        setTimeout(() => {
          this.setState({confirmDeletePopup: false, isPopupDisplayed: false});
          this.props.sendPopupInfoToKeptSessions(false);
          if (this.linkRef.current) {
            this.linkRef.current.click();
          }
        }, 5000);
    });
  }

  // stops showing popup if user decides to not remove entry from list of kept sessions
  deleteNope = () => {
    this.setState({maybeDeletePopup: false, isPopupDisplayed: false});
    this.props.sendPopupInfoToKeptSessions(false);
  }
  
  render() {
    return (
        <div>
            <div className={`${this.state.isPopupDisplayed ? "blurred" : ""}`}>
                <h3 className='text'>{this.props.date}</h3>
                <h4 className='type-text'>Type of Session: {this.props.type}</h4>
                <h4 id="entry-text">{this.props.entry}</h4>
                <button aria-label="button to delete self-reflection entry" className='delete-button' type="button" onClick={this.deleteMaybe}>Delete</button>
                <hr id="hr-line" />
            </div> 
            {/* popup that asks user if they are sure they want to delete entry from kept sessions list */}
            <>
            {this.state.maybeDeletePopup && (
                <div className="costPopup">
                <p className="popup-text">Are you sure you would like to delete your {this.props.type} from {this.props.date}? A heart icon will still be displayed for this entry's date on the monthly calendar if you decide to do so.</p>
                <div className="popup-buttons">
                    <button aria-label="button for yes" id="yes-button" onClick={this.deleteConfirm} type="button">Yes</button>
                    <button aria-label="button for no" id="no-button" onClick={this.deleteNope} type="button">No</button>
                </div>
                </div>
            )}
            </>
            {/* popup that confirms that entry will be removed */}
            <>
            {this.state.confirmDeletePopup && (
              <div className="costPopup">
                <p className="popup-text">Deleting your {this.props.type} and sending you back to the home page...</p>
                <Link to="/" ref={this.linkRef} style={{display: "none"}}>
                  <p>redirect</p>
                </Link>
              </div>
            )}
            </> 
            <Outlet /> 
        </div>   
    );
  }
}

export default KeptSessionEntry;