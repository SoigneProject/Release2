import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={getCurrentUser}>
          Get Current User
        </button>
        <button type="button" onClick={() => logoutUser(this.props)}>
          Log Out
        </button>
      </div>
    );
  }
}

function logoutUser(props) {
  const { history } = props;
  axios
    .get("http://localhost:6969/users/logout", { withCredentials: true })
    .then(json => {
      if (json.data.loggedOut) {
        alert("Logged out");
        history.push('/');
      }
    });
}

function getCurrentUser() {
  // Post request to backend
  axios
    .get("http://localhost:6969/user/currentuser", { withCredentials: true })
    .then(json => {
      if (json.data.username) {
        console.log("SUCCESS");
        alert(json.data.username);
      } else {
        console.log("FAIL");
      }
    });
}

export default Profile;
