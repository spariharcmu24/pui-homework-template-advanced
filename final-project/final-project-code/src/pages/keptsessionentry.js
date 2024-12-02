import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import './keptsessionentry.css';
// import './journal.css';
// This file acts as the homepage for the website.
class KeptSessionEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
        maybeDeletePopup: false,
        confirmDeletePopup: false,
    };
    this.linkRef = React.createRef();       
  } 

  removeItem = (date) => {
    localStorage.removeItem("Entry-"+date);
    let listOfEntryKeys = Object.keys(localStorage);
    let listOfEntryItems = [];
    listOfEntryKeys.map(key => listOfEntryItems.push(JSON.parse(localStorage.getItem(key))))
    this.props.sendDataToKeptSessions(listOfEntryItems);
    // printed out the cart in local storage whenever it is updated
    console.log("printing out local storage without parsing the data after removing a cart item:", localStorage);
    console.log("printing out parsed local storage after removing a cart item:", listOfEntryItems);
  }

  deleteMaybe = () => {
    this.setState({maybeDeletePopup: true});
  }

  deleteConfirm = () => {
    this.setState({maybeDeletePopup: false});
    this.setState({confirmDeletePopup: true}, () => {
        setTimeout(() => {
          this.removeItem(this.props.date);
          }, 2000);
        setTimeout(() => {
          this.setState({confirmDeletePopup: false});
          if (this.linkRef.current) {
            this.linkRef.current.click();
          }
        }, 3000);
    });
  }

  deleteNope = () => {
    this.setState({maybeDeletePopup: false});
  }
  
  render() {
    return (
        <div>
            <div>
                <h2>{this.props.date}</h2>
                <h3>Type of Session: {this.props.type}</h3>
                <h2 id="entry-text">{this.props.entry}</h2>
                <button type="button" onClick={this.deleteMaybe}>Delete</button>
                <hr id="hr-line" />
            </div> 
            <>
            {this.state.maybeDeletePopup && (
                <div className="costPopup">
                <h2>Are you sure you would like to delete your {this.props.type} from {this.props.date}?</h2>
                <div id="reflection-buttons">
                    <button onClick={this.deleteConfirm} type="button">Yes</button>
                    <button onClick={this.deleteNope} type="button">No</button>
                </div>
                </div>
            )}
            </>
            <>
            {this.state.confirmDeletePopup && (
              <div className="costPopup">
                <h2>Deleting your {this.props.type}...</h2>
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