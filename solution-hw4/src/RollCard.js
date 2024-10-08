import React, { Component } from 'react';
import './RollCard.css';

// External Resources Citation: 
// https://coderfiles-dev.vercel.app/blog/react-show-hide-after-few-seconds --> took inspiration from article to make popup appear for only a few seconds

class Roll extends Component {
    // Multiple React state properties were created to keep track of different glazing options, pack sizes, and updated prices for different orders.
    // glazingOptions and packSizeOptions were specifically created to populate the glazing dropdown menus and pack size buttons.
    // popup was created to make a popup appear whenever an add to cart button is clicked on.
    constructor(props) {
        super(props);
        this.state = {
            glazing: "Keep original",
            packSize: "1",
            updatedPrice: this.props.basePrice,
            glazingOptions: ["Keep original", "Sugar milk", "Vanilla milk", "Double chocolate"],
            packSizeOptions: ["1", "3", "6", "12"],
            popup: false,
            clickedIndex: false
        };    
    }

    // updates base price for each roll a user can order
    componentDidUpdate(prevProps) {
        if (this.props.basePrice !== prevProps.basePrice) {
            this.pricing();
        }
      }

    // The method below calculates the changing price of an item whenever a different pack size option or glazing option is clicked on in a specific Roll component.
    pricing(){
        let basePrice = Number(this.props.basePrice);
        let glazePrice = 0;
        let packMultiple = 1;

        if (this.state.glazing == "Keep original" || this.state.glazing === "Sugar milk"){
            glazePrice = 0;
        }
        else if (this.state.glazing === "Vanilla milk"){
            glazePrice = 0.50;
        }
        else{
            glazePrice = 1.50;
        }

        if (this.state.packSize === "1"){
            packMultiple = 1;
        }
        else if (this.state.packSize === "3"){
            packMultiple = 3;
        }
        else if (this.state.packSize === "6"){
            packMultiple = 5;
        }
        else{
            packMultiple = 10;
        }
        let newPricing =  (basePrice + glazePrice) * packMultiple;
        // console.log("new pricing", newPricing)
        newPricing = newPricing.toFixed(2);
        newPricing = Number(newPricing).toFixed(2);
        this.setState({updatedPrice: newPricing})
    }

    // The event handler below changes the value of the React state property called packSize whenever a different pack size number is clicked on in the website for a specific Roll component.
    switchPackSizeHandler = (event) => {
        this.setState({packSize: event.target.value}, () => {
            this.pricing();
        });
    };

    // two functions below helps with changing the color of the pack size buttons to gray when clicked on and to gray when it isn't clicked on
    whenFocused = (index) => {
        this.setState({clickedIndex: index})
    }
    whenBlurred = () => {
        this.setState({clickedIndex: null})
    }

    // The event handler below changes the value of the React state property called glazing whenever a different glazing option is clicked on in the website for a specific Roll component.
    switchGlazingHandler = (event) => {
        this.setState({glazing: event.target.value}, () => {
            // console.log("updated glaze:", this.state.glazing)
            this.pricing();
            // console.log(updatedPrice);
        });
    };

    // Whenever an add to cart button is clicked on, an object literal is created with all the important information about the order, such as the type of roll, the pack size, the glazing option, and the price of the order.
    // That object literal is passed back to the parent component, which is the Homepage component in index.js.
    // The second part of the method triggers the popup to appear for three seconds with all the information about the order by setting the React state property called popup to true whenever the add to cart buttons are clicked on.
    // popup is then set back to false after three seconds to hide the popup
    addCartHandler = () => {
        let newRoll = {
            type: this.props.type,
            glazing: this.state.glazing,
            packSize: this.state.packSize,
            updatedPrice: this.state.updatedPrice,
            imageURL: this.props.imageURL
        };
        this.props.sendDataToHomepage(newRoll);
        this.setState({popup: true}, () => {
            setTimeout(() => {this.setState({popup: false})}, 3000);
        });
    };

    render() {
      return (
        <div className="crolls">
            <img className="croll-img" src={this.props.imageURL} />
            <p className="bold-txt txt bigger">{this.props.type}</p>
            <div className="glazing">
                <div>
                    <p className="txt smaller">Glazing:</p>
                </div>
                {/* <!-- made sure to add all options for the dropdown menu by iterating through the React state property called glazingOptions and populating the dropdown with options that correspond to a specific glazing option --> */}
                <select onChange={this.switchGlazingHandler} className="single-btn dropdown">
                    {this.state.glazingOptions.map((option, ind) => {
                        return (
                            <option key={ind} value={option} className="txt smaller">{option}</option>
                        );
                    })}
                </select>
            </div>
            <div className="pack-size">
                <div>
                    <p className="txt smaller">Pack Size:</p>
                </div>
                {/* <!-- made sure to add all options for the pack size buttons by iterating through the React state property called packSizeOptions and populating the div with buttons that correspond to a specific pack size --> */}
                <div className="pack-buttons">
                    {this.state.packSizeOptions.map((option, ind) => {
                        return (
                            <button onFocus={() => this.whenFocused(ind)} onBlur={() => this.whenBlurred} onClick={this.switchPackSizeHandler} style={{backgroundColor: this.state.clickedIndex === ind ? 'lightgray' : 'white'}} key={ind} value={option} className="btn-pack txt smaller">{option}</button>
                        );
                    })}
                </div>
            </div>
            <div className="cart">
                <div>
                    <p className="bold-txt txt bigger">$ {this.state.updatedPrice}</p>
                </div>
                <button onClick={this.addCartHandler} className="bold-txt txt bigger single-btn add-btn">Add to Cart</button>
            </div>
            {/* The code below is for the popup */}
            <>
                {this.state.popup && (
                    <div className="costPopup">
                        <div className="orderContent">
                            <p className="addLine">Added to Cart:</p>
                            <p className="typeLine content">{this.props.type}</p>
                            <p className="glazeLine content">{this.state.glazing} glazing</p>
                            <p className="packLine content">Pack of {this.state.packSize}</p>
                            <p className="specPrice content">Price: {this.state.updatedPrice}</p>
                        </div>
                    </div>
                )}
            </>
        </div>
      );
    }
}

export default Roll;


            