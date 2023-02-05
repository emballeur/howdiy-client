import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//
import "./root.css";
//
import title from "./img/Join.png";
import faceLogo from "./img/Face-dark.png";
import houseLogo from "./img/House-dark.png";
import playLogo from "./img/Play-dark.png";

export class Join extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <img src={title} alt="title" className="root-title" />

        <div className="root-text">
          <div>
            <h5>
              Do without the aggressive chemical cleaning agents & other hidden
              baddies in cosmetics and toys
            </h5>
            <img
              className="root-img-styles"
              src={houseLogo}
              alt="join-saloon"
            />
            <h5>
              Save plastic waste and money too - protecting your health and the
              environment at the same time. <br />
            </h5>
            <img className="root-img-styles" src={playLogo} alt="join-play" />
            <h5>
              Join our savvy community to see Orange Peel suffer a plot twist as
              floorcleaners or turn flour into playdough
            </h5>
            <img className="root-img-styles" src={faceLogo} alt="join-face" />
            <h5>
              Comment on recipes to share variations or celebrate each other!{" "}
              <br />
              Let's share our knowledge, pass down great "recipes" and become
              part of this Howdiy movement.
            </h5>
          </div>
          { !user && (
          <div className="root-button-container">
            <NavLink className="root-submit" to="/signup">
              Sign me up!
            </NavLink>
          </div>
          )}
          <br className="page-bottom"/>
        </div>
      </div>
    );
  }
}

export default Join;
