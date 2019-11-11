import React, { Component } from "react";
import axios from "axios";
import FormData from "form-data";

class PicUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      file: null
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
    const form = new FormData();
    form.append()
    axios
      .post("http://localhost:6969/posts", {
        title: this.state.title,
        description: this.state.description,
        photo: this.state.file.name
      }, {
          headers: form.getHeaders()
      })
      .then(json => {
        console.log(json);
        if (json.data.created) {
          //Creates post
          console.log("POST CREATION SUCCESS");
        //   axios
        //     .post("http://localhost:6969/items", {
        //       name: iname,
        //       url: ilink,
        //       clothingCategory: "test",
        //       retailerID: "1235"
        //     })
        //     .then(json => {
        //       if (json.data.created) {
        //         console.log("ITEM CREATION SUCCESS");
        //         history.push("/");
        //       } else {
        //         console.log("ITEM CREATION FAIL");
        //         history.push("/"); // Temporary redirect
        //       }
        //     });
        } else {
          // Handle failed post creation?
          console.log("POST CREATION FAIL");
        }
      });
  }

  render() {
    return (
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
    );
  }
}

export default PicUpload;
