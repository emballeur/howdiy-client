// this URL will be "/howdiy/:id/edit"

import axios from "axios";
import React, { Component } from "react";

class HowdiyEdit extends Component {
  state = {
    categoryList: [
      "facecare",
      "bodycare",
      "housecare",
      "play",
      "food",
      "drink",
    ],
    category: "",
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
    createdBy: null, // add THIS username's name here
    isOwner: false, // change this to true or shall we already say TRUE?? since its a create
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
    } = this.state;
    axios
      .post(
        `${process.env.REACT_APP_API_HOST}/recipes/${this.props.match.params.id}/edit`,
        {
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
        },
        { withCredentials: true }
      )
      .then(() => this.props.history.push("/"))
      .catch(() => this.props.history.push("/500"));
  }; // this.setState({ categories: response.data, isLoading: false });

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_HOST}/recipes/${this.props.match.params.id}/edit`
      )
      .then((response) => {
        this.setState({
          category: response.data.category,
          descriptiveName: response.data.descriptiveName,
          ingredients: response.data.ingredients,
          preparation: response.data.preparation,
          productImg: response.data.productImg,
          isGiftable: response.data.isGiftable,
          gallery: response.data.gallery,
          timeOfPreparation: response.data.timeOfPreparation,
          costRating: response.data.costRating,
          difficultyRating: response.data.difficultyRating,
        });
      })
      .catch((err) => {});
  }

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
          <label htmlFor="category">Category</label>
          <select name="category" id="category-select">
            <option value="facecare">Facecare</option>
            <option value="bodycare">Bodycare</option>
            <option value="housecare">Housecare</option>
            <option value="play">Play</option>
            <option value="food">Food</option>
            <option value="drink">Drink</option>
          </select>
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

export default HowdiyEdit;