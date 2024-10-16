import React, { Component } from 'react';
import './RollCard.css';

// External Resources Citation (for HW 5): 
// https://coderfiles-dev.vercel.app/blog/react-show-hide-after-few-seconds --> took inspiration from article to make popup appear for only a few seconds
// https://stackoverflow.com/questions/53847415/change-the-color-of-button-when-onfocus-input --> took inspiration to create functions whenFocused and whenBlurred
// https://stackoverflow.com/questions/74271812/changing-buttons-colours-on-click-in-react-js --> took inspiration to change a specific pack size button to gray depending on their index number

// got help from Cella (TA) and Jade to understand how to use componentDidUpdate

// External Resources Citation (for HW 6): 
// https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage --> took inspiration to figure out how to add another item to local storage while updating existing local storage

class Roll extends Component {
    // Multiple React state properties were created to keep track of different glazing options, pack sizes, and updated prices for different orders.
    // glazingOptions and packSizeOptions were specifically created to populate the glazing dropdown menus and pack size buttons.
    // popup was created to make a popup appear whenever an add to cart button is clicked on.
    // clickedIndex keeps track of which pack size button is being clicked on
    constructor(props) {
        super(props);
        this.state = {
            glazing: "Keep original",
            packSize: "1",
            updatedPrice: this.props.basePrice,
            glazingOptions: ["Keep original", "Sugar milk", "Vanilla milk", "Double chocolate"],
            packSizeOptions: ["1", "3", "6", "12"],
            popup: false,
            clickedIndex: false,
            adder: 0
        };    
    }

    // updates the base price for each roll a user can order, even when order of rolls is changed based on base price or name
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

    // two functions below helps with changing the color of the pack size buttons to gray when clicked on and to white when it isn't clicked on
    whenFocused = (index) => {
        this.setState({clickedIndex: index})
    }
    whenBlurred = () => {
        this.setState({clickedIndex: null})
    }

    // The event handler below changes the value of the React state property called glazing whenever a different glazing option is clicked on in the website for a specific Roll component.
    switchGlazingHandler = (event) => {
        this.setState({glazing: event.target.value}, () => {
            this.pricing();
        });
    };

    // Whenever an add to cart button is clicked on, an object literal is created with all the important information about the order, such as the type of roll, the pack size, the glazing option, the price of the order and an image of the roll.
    // used addCartHandler function to serialize a cart item instance to JSON using JSON.stringify
    // also stored a cart item’s JSON in localStorage when it is added to the shopping cart using localStorage.setItem()
    // updating listOfCartItems and sending it over to homepage in index.js
    // The second part of the method triggers the popup to appear for three seconds with all the information about the order by setting the React state property called popup to true whenever the add to cart buttons are clicked on.
    // popup is then set back to false after three seconds to hide the popup
    addCartHandler = () => {
        this.setState({adder: this.state.adder+1})
        let newRoll = {
            type: this.props.type,
            glazing: this.state.glazing,
            packSize: this.state.packSize,
            updatedPrice: this.state.updatedPrice,
            imageURL: this.props.imageURL,
            adder: this.state.adder
        };
        localStorage.setItem("CartItem-"+newRoll["type"]+"-"+newRoll["glazing"]+"-"+newRoll["packSize"]+"-"+newRoll["updatedPrice"]+"-"+newRoll["adder"], JSON.stringify(newRoll));
        let listOfCartKeys = Object.keys(localStorage);
        let listOfCartItems = [];
        listOfCartKeys.map(key => listOfCartItems.push(JSON.parse(localStorage.getItem(key))));
        // printed out the cart in local storage whenever it is updated
        console.log("printing out local storage without parsing the data after adding a cart item:", localStorage);
        console.log("printing out parsed local storage after adding a cart item:", listOfCartItems);
        this.props.sendDataToHomepage(listOfCartItems);
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
                {/* also made sure that pack size buttons turn gray when clicked on using inline styling */}
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


            