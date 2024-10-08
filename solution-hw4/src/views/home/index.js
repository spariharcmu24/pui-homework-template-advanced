import React, { Component } from 'react';
import '../../App.css';
import Navbar from '../../Navbar';
import Roll from '../../RollCard';
import './index.css';

// External Resources Citation: 
// https://sentry.io/answers/string-contains-substring-javascript/#:~:text=The%20includes()%20method,found%2C%20or%20false%20if%20not. --> helped me understand how to check if a string is a substring of another
// https://www.w3schools.com/html/html_forms.asp --> helped me understand how to create a search bar and button
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort --> helped me understand how to use sort to order cinnamon rolls based on base price or name


// This file acts as the homepage for the website.
class Homepage extends Component {
  // Created state properties rolls, searchedRolls, and searched to keep track of search functionality, sort functionality, and cart functionality
  constructor(props) {
    super(props);
    this.state = {
        listCart: [],
        rolls: [
          {
            imageURL: process.env.PUBLIC_URL + "/assets/products/apple-cinnamon-roll.jpg",
            type: "Apple Cinnamon Roll",
            basePrice: "3.49",
          },
          {
            imageURL: process.env.PUBLIC_URL + "/assets/products/double-chocolate-cinnamon-roll.jpg",
            type: "Double Chocolate Cinnamon Roll",
            basePrice: "3.99",
          }, 
          {
            imageURL: process.env.PUBLIC_URL + "/assets/products/original-cinnamon-roll.jpg",
            type: "Original Cinnamon Roll",
            basePrice: "2.49"
          },
          {
            imageURL: process.env.PUBLIC_URL + "/assets/products/raisin-cinnamon-roll.jpg",
            type: "Raisin Cinnamon Roll",
            basePrice: "2.99",
          }, 
          {
            imageURL: process.env.PUBLIC_URL + "/assets/products/strawberry-cinnamon-roll.jpg",
            type: "Strawberry Cinnamon Roll",
            basePrice: "3.99",
          },
          {
            imageURL: process.env.PUBLIC_URL + "/assets/products/walnut-cinnamon-roll.jpg",
            type: "Walnut Cinnamon Roll",
            basePrice: "3.49",
          }
        ],
        searchedRolls: [],
        searched: false,
    };    
  }

  // The method below gets data from the child component, which in this case is Roll in RollCard.js. Each time the Roll component is called on, data returns back an object literal that contains the type of cinnamon roll order, the pack size, the glaze, and the calculated price.
  // That object literal is then added to the listCart state property to keep track of orders.
  // This method is called on each time the Roll component is called in render.
  handleDataFromRollCard = (data) => {
    // console.log(data);
    this.setState( (prevState) => ({
      listCart: [...prevState.listCart, data]
    }), () => {
      // console.log(this.state.listCart);
    })
  }

  // list cart updates depending on if any orders were removed from the shopping cart, which occurs in Navbar.js
  handleDataFromNavBar = (data) => {
    this.setState({listCart: data});
  }

  // gets the input from the search field and finds rolls that contains a substring of that input in their names
  // updates searchedRolls
  handleFilterRolls = (event) => {
    this.setState({searched: true});
    this.setState({searchedRolls: []});
    let targetSearch = document.getElementById("search-bar").value.toLowerCase();
    if (targetSearch === ""){
      this.setState({searchedRolls: this.state.rolls})
    }
    for (let i = 0; i < this.state.rolls.length; i++){
      let currentRoll = this.state.rolls[i];
      let currentType = currentRoll['type'].toLowerCase();
      if (currentType.includes(targetSearch) && targetSearch !== ""){
        this.setState({chosen: true});
        this.setState((prevState) => ({
          searchedRolls: [...prevState.searchedRolls, currentRoll]
        }));
      }
    }
  }

  // orders the types of cinnamon rolls based on base price and name and displays those rolls in that particular order
  ascendingOrder = (event) => {
    if (event.target.value === "Base Price"){
      let initialList = [...this.state.rolls];
      let searchedList = [...this.state.searchedRolls];
      let tempListInitialRolls = initialList.sort((firstRoll, secondRoll) => firstRoll.basePrice - secondRoll.basePrice);
      let tempListSearchedRolls = searchedList.sort((firstRoll, secondRoll) => firstRoll.basePrice - secondRoll.basePrice);
      this.setState({rolls: tempListInitialRolls})
      this.setState({searchedRolls: tempListSearchedRolls});
    }
    else{
      let initialList = [...this.state.rolls];
      let searchedList = [...this.state.searchedRolls];
      let tempListInitialRolls = initialList.sort((firstRoll, secondRoll) => {
        const rollA = firstRoll.type.toUpperCase();
        const rollB = secondRoll.type.toUpperCase();
        if (rollA < rollB) {
          return -1;
        }
        if (rollA > rollB) {
          return 1;
        }
        return 0;
      });
      let tempListSearchedRolls = searchedList.sort((firstRoll, secondRoll) => {
        const rollA = firstRoll.type.toUpperCase();
        const rollB = secondRoll.type.toUpperCase();
        if (rollA < rollB) {
          return -1;
        }
        if (rollA > rollB) {
          return 1;
        }
        return 0;
      });
      this.setState({rolls: tempListInitialRolls})
      this.setState({searchedRolls: tempListSearchedRolls});
    }
  }

  
  render() {
    return (
      <div className="Homepage">
        <div id="container">
          <header>
            <title>PUI HW 5- Sapna Parihar</title>
          </header>
          {/* Navbar contains the logo, the slogan, the menu buttons, the number of items, and the total cost. */}
          {/* The listCart state property also gets passed through the Navbar component to calculate the total cost and the number of items. */}
          {/* this.handleDataFromNavbar is also added to Navbar call to get updated shopping cart list */}
          {/* added search box and sorting dropdown as well */}
          <Navbar sendDataToHomepage={this.handleDataFromNavBar} listCart={this.state.listCart} />
          <div className="search-functions">
            <form className="search-box" action='#'>
              <input type="text" id="search-bar" name="search"/>
              <button id="search-button" type="button" onClick={this.handleFilterRolls}>Search</button>
            </form>
            <div className="sort-box">
              <p id="sort-by-text">Sort by: </p>
              <select id='dropdown' onChange={this.ascendingOrder}>
                  <option value={"Name"} className="txt smaller">Name</option>
                  <option value={"Base Price"} className="txt smaller">Base Price</option>
              </select>
            </div>
          </div>
          {/* <!-- croll list contains all the images, buttons, dropwdown menus, and text for each cinnamon roll --> */}
          {/* <!-- Each Roll contains an image with the same content for the text, buttons, and dropdown menus --> */}
          {/* updating the list of rolls depending on search functionality and/or sorting functionality */}
          <div id="croll-list">
            {this.state.searched ? 
              (this.state.searchedRolls.length > 0 ? this.state.searchedRolls.map((option, ind) => {
                return (
                  <Roll sendDataToHomepage={this.handleDataFromRollCard} key={ind} imageURL={option['imageURL']} type={option['type']} basePrice={option['basePrice']}/>
                );
                }) : (
                  <p id="no-match">No match!</p>
                ))
              :
              this.state.rolls.map((option, ind) => {
                return (
                  <Roll sendDataToHomepage={this.handleDataFromRollCard} key={ind} imageURL={option['imageURL']} type={option['type']} basePrice={option['basePrice']}/>
                );
              })       
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;