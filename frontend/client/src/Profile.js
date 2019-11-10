import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  render() {
    return (
      <button type="button" onClick={getCurrentUser}>
        Get Current User
      </button>
    );
  }
}

function getCurrentUser() {
  // Post request to backend
  axios.get("http://localhost:6969/user/currentuser", { withCredentials: true} ).then(json => {
    if (json.data.username) {
      console.log("SUCCESS");
      alert(json.data.username);
    } else {
      console.log("FAIL");
    }
  });
}

export default Profile;
