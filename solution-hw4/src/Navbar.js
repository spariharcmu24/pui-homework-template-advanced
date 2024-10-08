import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  // A React state property called totalCost is created to store the totalCost value after it's calculated in calculateTotalCost
  // also added property called showingItems to help display orders if shopping cart is not empty
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

  // changes the boolean value of showingItems state property depending on whether or not any orders are present
  showItems = () => {
    if (this.state.showingItems === false){
      this.setState({showingItems: true});
    }
    else{
      this.setState({showingItems: false});
    }
  }

  // removes any order items and sends changed array over to index.js
  removeItem = (ind) => {
    let tempListArr = this.props.listCart;
    tempListArr.splice(ind,1);
    this.props.sendDataToHomepage(tempListArr);
  }

    render() {
      // The method above is called inside the render function to regularly update the total cost, especially after any of the add to cart buttons are clicked on.
      // added code to display shopping cart if cart button is clicked on, also shows that cart is empty when it doesn't have any orders
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
                        <div className="cart-ordercard" key={ind}>
                            <img className="order-img" src={option["imageURL"]} />
                            <p className="bottom-spacing">{option["type"]}</p>
                            <p className="bottom-spacing">Glazing: {option["glazing"]}</p>
                            <p className="bottom-spacing">Pack Size: {option["packSize"]}</p>
                            <p className="bold-text bottom-spacing">$ {option["updatedPrice"]}</p>
                            <button className="remove-button" onClick={() => this.removeItem(ind)}>Remove</button>
                        </div>
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