import React, { Component } from 'react';
import '../../App.css';
import Navbar from '../../Navbar';
import RollCard from '../../RollCard';

class Homepage extends Component {
  render() {
    return (
      <div className="Homepage">
        <div id="container">
          <header>
            <title>PUI HW 1- Sapna Parihar</title>
          </header>
          <Navbar />
            {/* <!-- croll list contains all the images, buttons, dropwdown menus, and text for each cinnamon roll --> */}
            <div id="croll-list">
              {/* <!-- each RollCard contains an image with the same content for the text, buttons, and dropdown menus --> */}
              <RollCard imageURL={"assets/products/original-cinnamon-roll.jpg"} type={"Original Cinnamon Roll"} basePrice={"$ 2.49"}/>
              <RollCard imageURL={"assets/products/apple-cinnamon-roll.jpg"} type={"Apple Cinnamon Roll"} basePrice={"$ 3.49"}/>
              <RollCard imageURL={"assets/products/raisin-cinnamon-roll.jpg"} type={"Raisin Cinnamon Roll"} basePrice={"$ 2.99"}/>
              <RollCard imageURL={"assets/products/walnut-cinnamon-roll.jpg"} type={"Walnut Cinnamon Roll"} basePrice={"$ 3.49"}/>
              <RollCard imageURL={"assets/products/double-chocolate-cinnamon-roll.jpg"} type={"Double Chocolate Cinnamon Roll"} basePrice={"$ 3.99"}/>
              <RollCard imageURL={"assets/products/strawberry-cinnamon-roll.jpg"} type={"Strawberry Cinnamon Roll"} basePrice={"$ 3.99"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;