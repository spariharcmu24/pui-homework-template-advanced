import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    render() {
      return (
        <div className="Navbar">
            <div id="header">
              <div id="left-side">
                <img id="logo-img" src="assets/logo/logo-01.svg"/>
              </div>
              <div id="right-side">
                <div id="menu-btns">
                  <button class="txt menu-btn">PRODUCTS</button>
                  <button class="txt menu-btn">CART</button>
                </div>
                <div>
                  <hr id="hr-line" />
                </div>
                <div>
                  <p id="slogan-txt" class="txt">Our hand-made cinammon rolls</p>
                </div>
              </div>
            </div>
        </div>
      );
    }
}

export default Navbar;