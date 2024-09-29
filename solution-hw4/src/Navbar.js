import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  // A React state property called totalCost is created to store the totalCost value after it's calculated in calculateTotalCost
  constructor(props) {
    super(props);
    this.state = {
        totalCost: 0.00,
    };    
  }

  // The method below calculates the total cost of all items that are ordered. The list of orders comes from this.props.listCart, which is passed in from index.js. 
  calculateTotalCost = () => {
    let listCart = this.props.listCart;
    let newTotal = 0;
    for (let i = 0; i < listCart.length; i++){
      let currOrder = listCart[i]
      let currentPrice = Number(currOrder["updatedPrice"])
      newTotal += currentPrice
    }
    let newTotalString = newTotal.toFixed(2);
    return newTotalString;
  }

    render() {
      // The method above is called inside the render function to regularly update the total cost, especially after any of the add to cart buttons are clicked on.
      let totalCostNav = this.calculateTotalCost();
      return (
        <div className="Navbar">
            <div id="header">
              <div id="left-side">
                <img id="logo-img" src={process.env.PUBLIC_URL + "/assets/logo/logo-01.svg"}/>
              </div>
              <div id="right-side">
                <div id="menu-btns">
                  <button className="txt menu-btn">PRODUCTS</button>
                  <button className="txt menu-btn">CART</button>
                </div>
                <div className="cartItems">
                  <p id="numeroItems">{this.props.listCart.length} item(s)</p>
                  <p id="totalCost">Total: $ {totalCostNav}</p>
                </div>
                <div>
                  <hr id="hr-line" />
                </div>
                <div>
                  <p id="slogan-txt" className="txt">Our hand-made cinammon rolls</p>
                </div>
              </div>
            </div>
        </div>
      );
    }
}

export default Navbar;