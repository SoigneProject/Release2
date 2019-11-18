/*
 * PicUpload.js
 * A temp file to test photo uploading functionality. Need to implement it in official Create Post component
 */
import React, { Component } from "react";
import axios from "axios";

class PicUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      file: null,
      username: "Cogart",
      photo: ""
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleDescChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleFileChange(event) {
    this.setState({
      file: event.target.files[0]
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("username", this.state.username);

    axios.post("http://localhost:6969/posts", formData).then(json => {
      console.log(json);
      if (json.data.created) {
        //Creates post
        console.log("POST CREATION SUCCESS");
      } else {
        // Handle failed post creation?
        console.log("POST CREATION FAIL");
      }
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:6969/posts/id/5dd1fce19fed3b13d06c6ffc")
      .then(res => {
        this.setState({
          photo: res.data.photo
        });
      });
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div class="field">
          <label> Title </label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </div>
        <div class="field">
          <label> Description </label>
          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleDescChange}
          ></textarea>
        </div>
        <div class="field">
          <label> Image </label>
          <input name="photo" type="file" onChange={this.handleFileChange} />
        </div>
        <button class="ui primary button" type="submit">
          Post
        </button>
      </form>
      <img src={this.state.photo}></img>
      </div>
    );
  }
}

export default PicUpload;
