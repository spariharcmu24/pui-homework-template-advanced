import React, { Component } from 'react';
import '../../App.css';
import Navbar from '../../Navbar';
import Roll from '../../RollCard';

// External Resources Citation: 
// https://stackoverflow.com/questions/51974767/getting-broken-image-in-react-app --> helped me understand how to fix broken images issue
// https://www.geeksforgeeks.org/reactjs-setstate/ --> helped me understand how to use setState
// https://medium.com/@ozhanli/passing-data-from-child-to-parent-components-in-react-e347ea60b1bb --> helped me understand how to get data from a child component
// https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-react-js --> helped me understand how to add an element to a React state array

// This file acts as the homepage for the website.
class Homepage extends Component {
  // We create a state property called listCart to create a list of all the orders made in the website.
  constructor(props) {
    super(props);
    this.state = {
        listCart: [],
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

  
  render() {
    return (
      <div className="Homepage">
        <div id="container">
          <header>
            <title>PUI HW 4- Sapna Parihar</title>
          </header>
          {/* Navbar contains the logo, the slogan, the menu buttons, the number of items, and the total cost. */}
          {/* The listCart state property also gets passed through the Navbar component to calculate the total cost and the number of items. */}
          <Navbar listCart={this.state.listCart} />
          {/* <!-- croll list contains all the images, buttons, dropwdown menus, and text for each cinnamon roll --> */}
          <div id="croll-list">
            {/* <!-- Each Roll contains an image with the same content for the text, buttons, and dropdown menus --> */}
            <Roll sendDataToHomepage={this.handleDataFromRollCard} imageURL={process.env.PUBLIC_URL + "/assets/products/original-cinnamon-roll.jpg"} type={"Original Cinnamon Roll"} basePrice={"2.49"}/>
            <Roll sendDataToHomepage={this.handleDataFromRollCard} imageURL={process.env.PUBLIC_URL + "/assets/products/apple-cinnamon-roll.jpg"} type={"Apple Cinnamon Roll"} basePrice={"3.49"}/>
            <Roll sendDataToHomepage={this.handleDataFromRollCard} imageURL={process.env.PUBLIC_URL + "/assets/products/raisin-cinnamon-roll.jpg"} type={"Raisin Cinnamon Roll"} basePrice={"2.99"}/>
            <Roll sendDataToHomepage={this.handleDataFromRollCard} imageURL={process.env.PUBLIC_URL + "/assets/products/walnut-cinnamon-roll.jpg"} type={"Walnut Cinnamon Roll"} basePrice={"3.49"}/>
            <Roll sendDataToHomepage={this.handleDataFromRollCard} imageURL={process.env.PUBLIC_URL + "/assets/products/double-chocolate-cinnamon-roll.jpg"} type={"Double Chocolate Cinnamon Roll"} basePrice={"3.99"}/>
            <Roll sendDataToHomepage={this.handleDataFromRollCard} imageURL={process.env.PUBLIC_URL + "/assets/products/strawberry-cinnamon-roll.jpg"} type={"Strawberry Cinnamon Roll"} basePrice={"3.99"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;