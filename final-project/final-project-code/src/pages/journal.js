import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
// import '../../App.css';
// This file acts as the homepage for the website.
class JournalPage extends Component {
  constructor(props) {
    let submittedEntriesKeys = Object.keys(localStorage);
    let submittedEntries = [];
    // deserialized a JSON to cart item instances using JSON.parse()
    submittedEntriesKeys.map(key => submittedEntries.push(JSON.parse(localStorage.getItem(key))))
    console.log("here we go");
    console.log(submittedEntries);
    // const navigate = useNavigate();
    super(props);
    this.state = {
      submittedEntryList: submittedEntries,
      popupBackHome: false,
      popupChangedMind: false,
      popupSave: false,
      popupSaveConfirm: false,
      popupNotSave: false,
      popupNotSaveConfirm: false,
    };  
    this.linkRef = React.createRef();  
  } 

  submitEntry = (date) => {
    // console.log("date")
    // console.log(date);
    let currEntry = document.getElementById("journal-entry").value;
    let entryObject = {
      date: this.getDate(),
      entry: currEntry,
      type: "journal entry"
    }
    // console.log("yuhhhhh")
    // console.log(entryObject);
    this.setState((prevState) => ({
      submittedEntryList: [...prevState.submittedEntryList, entryObject]
    }));
    localStorage.setItem("Entry-"+entryObject["date"], JSON.stringify(entryObject));
    console.log(localStorage);
    // let listOfEntryKeys = Object.keys(localStorage);
    // let listOfEntryItems = [];
    // listOfEntryKeys.map(key => listOfEntryItems.push(JSON.parse(localStorage.getItem(key))));
    // this.props.sendDataToHomepage(listOfCartItems);
  }

  getDate = () => {
    let currDate = new Date();
    let month = currDate.getMonth()+1;
    let day = currDate.getDate();
    let year = currDate.getFullYear();
    let shownDate = month + "/" + day + "/" + year;
    console.log("yerrr");
    console.log(shownDate);
    return shownDate;
  }

  backHome = () => {
    console.log("HIIII");
    this.setState({popupBackHome: true});
    //   , () => {
    //   setTimeout(() => {this.setState({popup: false})}, 3000);
    // });
  }
  
  confirmBackHome = () => {
    this.setState({popupBackHome: false});
    this.setState({popupChangedMind: true}, () => {
      setTimeout(() => {
        this.setState({popupChangedMind: false});
        if (this.linkRef.current) {
          this.linkRef.current.click();
        }
      }, 3000);
    });
  }

  confirmNotBackHome = () => {
    this.setState({popupBackHome: false});
  }

  saveYes = () => {
    this.setState({popupSave: true});
  }

  saveYesConfirm = () => {
    this.submitEntry();
    this.setState({popupSave: false});
    this.setState({popupSaveConfirm: true}, () => {
      setTimeout(() => {
        this.setState({popupSaveConfirm: false});
        if (this.linkRef.current) {
          this.linkRef.current.click();
        }
      }, 3000);
    });
  }

  saveYestoNope = () => {
    this.setState({popupSave: false});
  }

  saveNo = () => {
    this.setState({popupNotSave: true});
  }

  saveNotoNope = () => {
    this.setState({popupNotSave: false});
  }

  saveNoConfirm = () => {
    this.setState({popupNotSave: false});
    this.setState({popupNotSaveConfirm: true}, () => {
      setTimeout(() => {
        this.setState({popupNotSaveConfirm: false});
        if (this.linkRef.current) {
          this.linkRef.current.click();
        }
      }, 3000);
    });
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
            <p>Date of Your Journal Entry: {this.getDate()}</p>
            <p>Please write what you're feeling below:</p>
            <input id="journal-entry" type="text" />
            <p>Would you like to keep your journal entry for later?</p>
            <div id="reflection-buttons">
                <button type="button" onClick={this.saveYes}>Yes</button>
                <button type="button" onClick={this.saveNo}>No</button>
            </div>
            <div id="back-home">
            {/* <Link to="/"> */}
            <button onClick={this.backHome} type="button">Take me back home</button>   
            {/* </Link>   */}
            </div>
          </div>
        </div>
        <Outlet/>
        <>
          {this.state.popupBackHome && (
              <div className="costPopup">
                  <h2>Are you sure you want to head back to the home page? Your self-reflection session isn't complete yet.</h2>
                  <div id="reflection-buttons">
                      <button onClick={this.confirmBackHome} type="button">Yes</button>
                      <button onClick={this.confirmNotBackHome} type="button">No</button>
                  </div>
              </div>
          )}
        </>
        <>
          {this.state.popupChangedMind && (
              <div className="costPopup">
                <h2>That's okay if you changed your mind. Let's get you back to the home page...</h2>
                <Link to="/" ref={this.linkRef} style={{display: "none"}}>
                  <p>redirect</p>
                </Link>
              </div>
          )}
        </>
        <>
          {this.state.popupSave && (
              <div className="costPopup">
                <h2>Are you sure you would like to save this self-reflection session?</h2>
                <div id="reflection-buttons">
                    <button onClick={this.saveYesConfirm} type="button">Yes</button>
                    <button onClick={this.saveYestoNope} type="button">No</button>
                </div>
              </div>
          )}
        </>
        <>
          {this.state.popupSaveConfirm && (
              <div className="costPopup">
                <h2>Saving your self-reflection session and taking you back to the home page in 3...2...1...</h2>
                <Link to="/" ref={this.linkRef} style={{display: "none"}}>
                  <p>redirect</p>
                </Link>
              </div>
          )}
        </>
        <>
          {this.state.popupNotSave && (
              <div className="costPopup">
                <h2>Are you sure you would not like to save this self-reflection session?</h2>
                <div id="reflection-buttons">
                    {/* <Link to="/"> */}
                    <button onClick={this.saveNoConfirm} type="button">Yes</button>
                    {/* </Link>  */}
                    <button onClick={this.saveNotoNope} type="button">No</button>
                </div>
              </div>
          )}
        </>
        <>
          {this.state.popupNotSaveConfirm && (
              <div className="costPopup">
                <h2>Even though you didn't save your session, good job for self-reflecting! :D Your progress will still be tracked on the monthly calendar. Taking you back to the home page in 3... 2... 1...</h2>
                <Link to="/" ref={this.linkRef} style={{display: "none"}}>
                  <p>redirect</p>
                </Link>
              </div>
          )}
        </>
      </div>
    );
  }
}

export default JournalPage;