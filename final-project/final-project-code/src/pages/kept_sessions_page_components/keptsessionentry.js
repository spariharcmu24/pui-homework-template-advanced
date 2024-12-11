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

  removeItem = (date) => {
    let currEntry = JSON.parse(localStorage.getItem("Entry-"+date));
    // console.log("current entryyyy")
    // console.log(currEntry);
    currEntry["inKeptSessions"] = "no";
    localStorage.setItem("Entry-"+date, JSON.stringify(currEntry));
    // localStorage.removeItem("Entry-"+date);
    let listOfEntryKeys = Object.keys(localStorage);
    let listOfEntryItems = [];
    listOfEntryKeys.map(key => listOfEntryItems.push(JSON.parse(localStorage.getItem(key))))
    this.props.sendDataToKeptSessions(listOfEntryItems);
  }

  deleteMaybe = () => {
    this.setState({maybeDeletePopup: true, isPopupDisplayed: true});
    this.props.sendPopupInfoToKeptSessions(true);
  }

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
        }, 3000);
    });
  }

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
            <>
            {this.state.maybeDeletePopup && (
                <div className="costPopup">
                <p className="popup-text">Are you sure you would like to delete your {this.props.type} from {this.props.date}?</p>
                <div className="popup-buttons">
                    <button aria-label="button for yes" id="yes-button" onClick={this.deleteConfirm} type="button">Yes</button>
                    <button aria-label="button for no" id="no-button" onClick={this.deleteNope} type="button">No</button>
                </div>
                </div>
            )}
            </>
            <>
            {this.state.confirmDeletePopup && (
              <div className="costPopup">
                <p className="popup-text">Deleting your {this.props.type}...</p>
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