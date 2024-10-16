import React, { Component } from 'react';
import './Navbar.css';
import CartItem from './CartItem';

// External Resources Citation (for HW 5):
// https://sentry.io/answers/remove-specific-item-from-array/ --> helped me understand how to remove elements from an array using splice


class Navbar extends Component {
  // A React state property called totalCost is created to store the totalCost value after it's calculated in calculateTotalCost
  // also added property called showingItems to help display orders in shopping cart if cart button is clicked on
  constructor(props) {
    super(props);
    this.state = {
        totalCost: 0.00,
        showingItems: false
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

  // changes the boolean value of showingItems state property depending on when cart button is clicked on
  showItems = () => {
    if (this.state.showingItems === false){
      this.setState({showingItems: true});
    }
    else{
      this.setState({showingItems: false});
    }
  }

  // updated listOfCartItems in CartItem.js and sending it over to homepage in index.js
  handleDataFromCartItem = (data) => {
    this.props.sendDataToHomepage(data);
  }

    render() {
      // added code to display shopping cart if cart button is clicked on, also shows that the cart is empty when it doesn't have any orders
      // also added code to add remove button for each shopping cart item that helps to remove a specific item from that list
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
                  <button onClick={this.showItems} className="txt menu-btn">CART</button>
                </div>
                <div>
                  <hr id="hr-line" />
                </div>
                <div>
                  <p id="slogan-txt" className="txt">Our hand-made cinammon rolls</p>
                </div>
              </div>
            </div>
            <div className="cart-list">
              {this.state.showingItems && 
              (this.props.listCart.length > 0 ? (
                <div className="cart-area">
                  <hr className="cart-lines"/>
                  <div className="total-items">
                    <p id="numeroItems">Shopping Cart ({this.props.listCart.length} item(s))</p>
                    <p id="totalCost">Total: $ {totalCostNav}</p>
                  </div>
                  <div>
                    <div className="order-list">
                    {this.props.listCart.map((option, ind) => {
                      return (
                        <CartItem key={ind} sendDataToNavBar={this.handleDataFromCartItem} option={option} ind={ind} listCart={this.props.listCart}/>
                      );})}
                    </div>
                  </div>
                  <hr className="cart-lines"/> 
                </div>
              )
              : 
              (<div>
                <hr className="cart-lines"/>
                <p id="empty-text">The cart is empty!</p>
                <hr className="cart-lines"/>
              </div>))
              }
            </div>
        </div>
      );
    }
}

export default Navbar;