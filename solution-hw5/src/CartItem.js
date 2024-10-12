import React, { Component } from 'react';
import './CartItem.css';

class CartItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            oneCartItem: JSON.parse(localStorage.getItem("CartItem-"+this.props.option["type"]+"-"+this.props.option["glazing"]+"-"+this.props.option["packSize"]+"-"+this.props.option["updatedPrice"]+"-"+this.props.option["adder"])) || this.props.option
        };
    }

    removeItem = () => {
        localStorage.removeItem("CartItem-"+this.props.option["type"]+"-"+this.props.option["glazing"]+"-"+this.props.option["packSize"]+"-"+this.props.option["updatedPrice"]+"-"+this.props.option["adder"]);
        let listOfCartKeys = Object.keys(localStorage);
        let listOfCartItems = [];
        listOfCartKeys.map(key => listOfCartItems.push(JSON.parse(localStorage.getItem(key))))
        this.props.sendDataToNavBar(listOfCartItems);
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
                <button className="remove-button" onClick={() => this.removeItem}>Remove</button>
            </div>
        )
    }
}

export default CartItem;
