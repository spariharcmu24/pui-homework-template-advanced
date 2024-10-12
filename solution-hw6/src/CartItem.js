import React, { Component } from 'react';
import './CartItem.css';

// External Resources Citation (for HW 6):
// https://stackoverflow.com/questions/50664632/remove-an-item-from-local-storage-in-reactjs --> helped me understand how to remove items from local storage

// created a cart item component
class CartItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            oneCartItem: JSON.parse(localStorage.getItem("CartItem-"+this.props.option["type"]+"-"+this.props.option["glazing"]+"-"+this.props.option["packSize"]+"-"+this.props.option["updatedPrice"]+"-"+this.props.option["adder"])) || this.props.option
        };
    }

    // Deleted a cart item’s JSON from local Storage when it is deleted from the shopping cart using localStorage.removeItem()
    // updating listOfCartItems and sending it over to Navbar.js
    removeItem = (ind) => {
        localStorage.removeItem("CartItem-"+this.props.option["type"]+"-"+this.props.option["glazing"]+"-"+this.props.option["packSize"]+"-"+this.props.option["updatedPrice"]+"-"+this.props.option["adder"]);
        let listOfCartKeys = Object.keys(localStorage);
        let listOfCartItems = [];
        listOfCartKeys.map(key => listOfCartItems.push(JSON.parse(localStorage.getItem(key))))
        this.props.sendDataToNavBar(listOfCartItems);
        // printed out the cart in local storage whenever it is updated
        console.log("printing out local storage without parsing the data after removing a cart item:", localStorage);
        console.log("printing out parsed local storage after removing a cart item:", listOfCartItems);
    }

    render() {
        return (
            <div className="cart-ordercard" key={this.props.ind}>
                <img className="order-img" src={this.props.option["imageURL"]} />
                <p className="bottom-spacing">{this.props.option["type"]}</p>
                <p className="bottom-spacing">Glazing: {this.props.option["glazing"]}</p>
                <p className="bottom-spacing">Pack Size: {this.props.option["packSize"]}</p>
                <p className="bold-text bottom-spacing">$ {this.props.option["updatedPrice"]}</p>
                <button className="remove-button" onClick={() => this.removeItem(this.props.ind)}>Remove</button>
            </div>
        )
    }
}

export default CartItem;
