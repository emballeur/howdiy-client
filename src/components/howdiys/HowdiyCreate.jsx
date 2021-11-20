// this URL will be "/howdiy/create"

import axios from "axios";
import React, { Component, Fragment } from "react";
import AddIngredients from "../AddIngredient/AddIngredients";
// import recipeService from "../services/recipe-services";

class HowdiyCreate extends Component {
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
    ingredients: [],
    preparation: [],
    step: 0,
    description: "",
    productImg: "",
    isGiftable: true,
    gallery: [],
    galleryImg: "",
    timeOfPreparation: 0, // specify mins in form
    costRating: 0, // TIP on how to calculate in form
    difficultyRating: 0,
    imageUrl: "",
  };

  handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
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
      createdBy,
    } = this.state;
    axios
      .post(
        `${process.env.REACT_APP_API_HOST}/recipes/create`,
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
          createdBy,
        },
        { withCredentials: true }
      )
      .then(() => this.props.history.push("/"))
      .catch(() => this.props.history.push("/500"));
  }; // this.setState({ categories: response.data, isLoading: false });

  handleAddIngredient = (ingredientObj) => {
    const { ingredients } = this.state;
    const newIngredients = [...ingredients, ingredientObj];
    this.setState({ ingredients: newIngredients });
  };

  handlePreparationSubmit = (event) => {
    event.preventDefault();
    const { step,
      description, 
      preparation } = this.state;
    const newStep = preparation.length + 1
    this.setState({ step: newStep})
    const newPreparationAdded = [...preparation, {step: newStep, description}];
    this.setState({ preparation: newPreparationAdded })
  }

  handleImageUpload = (event) => {
    // console.log(event.target.files[0]);
    this.setState({ imageIsUploading: true });

    const uploadData = new FormData();
    uploadData.append('imageUrl', event.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_HOST}/upload`, uploadData)
      .then((result) => {
        // console.log(result.data);
        this.setState({
          imageUrl: result.data.imagePath,
        });
      })
      .catch(() => this.props.history.push('/500'));
  };

  handleGallerySubmit = (event) => {
    event.preventDefault();
    const { galleryImg,
      gallery } = this.state;
    const newGallery = [...gallery, galleryImg]
    this.setState({ gallery: newGallery})
  }

  render() {
    const {
      descriptiveName,
      preparation,
      productImg,
      isGiftable,
      gallery,
      galleryImg,
      timeOfPreparation,
      costRating,
      difficultyRating,
      description,
      ingredients,
      imageUrl
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="category">Category</label>
          <select
            onChange={this.handleChange}
            name="category"
            id="category-select"
          >
            <option value="">Please select the category of your product</option>
            <option value="facecare">Facecare</option>
            <option value="bodycare">Bodycare</option>
            <option value="housecare">Housecare</option>
            <option value="play">Play</option>
            <option value="food">Food</option>
            <option value="drink">Drink</option>
          </select>
          <br />
          <label htmlFor="descriptiveName">Descriptive Name</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="descriptiveName"
            value={descriptiveName}
          />
          <br />
          <br />
          <label htmlFor="isGiftable">is Giftable</label>
          <input
            onChange={this.handleChange}
            type="checkbox"
            name="isGiftable"
            checked={isGiftable}
          />
          <br />
          <label htmlFor="timeOfPreparation">
            Rate how time consuming the Howdiy is
          </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="timeOfPreparation"
            value={timeOfPreparation}
          />
          <br />
          <label htmlFor="costRating">
            Rate how cost intense the Howdiy is
          </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="costRating"
            value={costRating}
          />
          <br />
          <label htmlFor="difficultyRating">
            Rate how difficult the Howdiy is
          </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="difficultyRating"
            value={difficultyRating}
          />
          <br />
          <br />
          <label for="productImg">Display Image for your Product:</label>
          {imageUrl && <img src={imageUrl} alt="imageUrl"/>}
          <input onChange={this.handleImageUpload} type="file" />
          <br/>
          <br/>
          <button type="submit">Create your Howdiy</button>
        </form>
        <br />
        <br />
        <label htmlFor="ingredientsTable">
            Here are your ingredients:
          </label>
        <ul>
          {ingredients.map((eachIngredient) => {
            return  <React.Fragment key={eachIngredient.name+eachIngredient.quantity}>
                      <li>{eachIngredient.name} {eachIngredient.quantity} {eachIngredient.measure} </li>
                    </React.Fragment>
          })}
        </ul>
        <AddIngredients handleAddIngredient={this.handleAddIngredient} />
        <br/>
        <label htmlFor="preparationTable">
            Here are your Preparation Steps:
          </label>
        <ul>
          {preparation.map((eachStep) => {
            return  <React.Fragment key={eachStep.step+eachStep.description}>
                      <li>{eachStep.step}</li>
                      <li>{eachStep.description}</li>
                    </React.Fragment>
          })}
        </ul>
        <form onSubmit={this.handlePreparationSubmit}>
            <input
                onChange={this.handleChange}
                placeholder="Please explain this step here ... "
                type="text"
                name="description"
                value={description}
            />
            
            <button type="submit">Add a Preparation Step</button>
        </form>
        <label htmlFor="galleryTable">
            Here is your Gallery:
          </label>
        <ul>
          {gallery.map((eachImg) => {
            return  <>
                      <li key={eachImg}><img src={eachImg} alt="galleryImg"/></li>
                    </>
          })}
        </ul>
        <form onSubmit={this.handleGallerySubmit}>
        <label for="galleryImg" htmlFor="gallery" alt="Your-uploaded-Howdiys">Gallery of your Howdiys:
          </label>
          <input onChange={this.handleChange} type="file" name={galleryImg} />
        <button type="submit">Add a Photo to your Gallery</button>
        </form>

      </div>
    );
  }
}

// hardcoded is okay but otherwise loop with a map

/* 
updateUser = (user) => { 
    recipeService
      .getUser(user)
      .then((response) => {
        this.setState({ createdBy: response.data, isLoading: false });
      })
      .catch((err) => {
        this.props.history.push("/500");
      });

 // in recipeService - contacting the BE uses the route recipe.routes.js
  getUser = (user) => {
    return this.service.get('/user');
  };
} */

export default HowdiyCreate;
