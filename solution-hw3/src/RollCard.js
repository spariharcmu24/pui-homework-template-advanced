import React, { Component } from 'react';
import './RollCard.css';

class RollCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };    
    }
    render() {
      return (
        <div class="crolls">
            <img class="croll-img" src={this.props.imageURL} />
            <p class="bold-txt txt bigger">{this.props.type}</p>
            <div class="glazing">
                <div>
                    <p class="txt smaller">Glazing:</p>
                </div>
                {/* <!-- made sure to add all options for the dropdown menu --> */}
                <select class="single-btn dropdown">
                    <option class="txt smaller">Keep original</option>
                    <option class="txt smaller">Sugar milk</option>
                    <option class="txt smaller">Vanilla milk</option>
                    <option class="txt smaller">Double chocolate</option>
                </select>
            </div>
            <div class="pack-size">
                <div>
                    <p class="txt smaller">Pack Size:</p>
                </div>
                <div class="pack-buttons">
                    <button class="btn-pack txt smaller">1</button>
                    <button class="btn-pack txt smaller">3</button>
                    <button class="btn-pack txt smaller">6</button>
                    <button class="btn-pack txt smaller">12</button>
                </div>
            </div>
            <div class="cart">
                <div>
                    <p class="bold-txt txt bigger">{this.props.basePrice}</p>
                </div>
                <button class="bold-txt txt bigger single-btn add-btn">Add to Cart</button>
            </div>
        </div>
      );
    }
}

export default RollCard;


            