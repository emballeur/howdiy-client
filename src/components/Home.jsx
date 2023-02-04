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
          <h3>DIY straight from your Pantry</h3>
          <h5>
            Sharing our recipes from far and wide in the six categories of{" "}
          </h5>
          <br />
          <h2>CLEANING • PLAY • FOOD • DRINK • BODYCARE • FACECARE</h2>
          <br />
          <h5>to meet our needs in fresh new ways.</h5>
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
          <h5 className="page-bottom">Go on, bet Grandma has some wise wisdoms we can rescue....</h5>
        </div>
      </div>
    );
  }
}

export default Home;
