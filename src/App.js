import "./App.css";
import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import authService from "./components/services/auth-services";
import Navbar from "./components/Navbar";

class App extends Component {
  state = {
    isLoggedIn: null,
    user: null,
  };

  setUser = (user, loggedInStatus) => {
    this.setState({
      user,
      isLoggedIn: loggedInStatus,
    });
  };

  getUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((response) => {
          this.setState({
            user: response.data.user,
            isLoggedIn: true,
          });
        })
        .catch((error) => {
          this.setState({
            isLoggedIn: false,
          });
        });
    }
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route
          exact
          path="/signup"
          element={<Signup setUser={this.setUser}/>}
        />
        <Route
          exact
          path="/login"
          element={<Login setUser={this.setUser}/>}
        />
      </Routes>
    </div>
  )}
}


export default App;