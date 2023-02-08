import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//
import "./root.css";
//
import title from "./img/howdiyGreen.png";

export class Home extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <img src={title} alt="title" className="root-title" />
        <div className="root-text">
          <h6 className="home-txt">DIY with everyday ingredients and share your recipes for: </h6>
          <h2 className="home-txt">CLEANING • PLAY • FOOD • DRINK • BODYCARE • FACECARE</h2>
          <h6 className="home-bottom">Go on, bet Grandma has some wise wisdoms we can rescue....</h6>
          { !user && (
            <div className="root-button-container">
            <NavLink className="root-submit" to="/signup">
              Sign me up!
            </NavLink>
          </div>
          )}
          <div className="root-button-container">
            <NavLink className="root-submit" to="/join">
              find out more...
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
