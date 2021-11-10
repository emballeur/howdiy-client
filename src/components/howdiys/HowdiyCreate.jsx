import axios from "axios";
import React, { Component } from "react";
// import recipeService from "../services/recipe-services";

class HowdiyCreate extends Component {
  state = {
    category: ["Facecare", "Bodycare", "Housecare", "Play", "Food", "Drink"],
    descriptiveName: "",
    ingredients: [
      {
        name: "",
        quantity: "",
      },
    ],
    preparation: [],
    productImg: "",
    isGiftable: false,
    gallery: [],
    timeOfPreparation: 0, // specify mins in form
    costRating: 0, // TIP on how to calculate in form
    difficultyRating: 0,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
        category,
        descriptiveName,
        ingredients,
        preparation,
        productImg,
        isGiftable,
        gallery,
        timeOfPreparation,
        costRating,
        difficultyRating,
      } = this.state
    axios.post(`${process.env.REACT_APP_API_HOST}/recipes`, {
        category,
        descriptiveName,
        ingredients,
        preparation,
        productImg,
        isGiftable,
        gallery,
        timeOfPreparation,
        costRating,
        difficultyRating,
      }, {withCredentials: true}).then( () => this.props.history.push("/"))
    .catch( () => this.props.history.push("/500"));
  } // this.setState({ categories: response.data, isLoading: false });

  render() {
    const {
        category,
        descriptiveName,
        ingredients,
        preparation,
        productImg,
        isGiftable,
        gallery,
        timeOfPreparation,
        costRating,
        difficultyRating,
      } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Descriptive Name</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="descriptiveName"
            value={descriptiveName}
          />
          <br />
          <label htmlFor="description">Cost Rating</label>
          <input
            onChange={this.handleChange}
            type="number"
            name="costRating"
            value={costRating}
          />
          <br />
          <br />
          <button type="submit">Create your Howdiy!!</button>
        </form>
      </div>
    );
  }
}

export default HowdiyCreate;