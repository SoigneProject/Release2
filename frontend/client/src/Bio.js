import React from 'react';
import axios from 'axios';

function contentEditable(WrappedComponent) {

  return class extends React.Component {

    state = {
      editing: false
    }

    toggleEdit = (e) => {
      e.stopPropagation();
      if (this.state.editing) {
        this.cancel();
      } else {
        this.edit();
      }
    };

    edit = () => {
      this.setState({
        editing: true
      }, () => {
        this.domElm.focus();
      });
    };

    save = () => {
      this.setState({
        editing: false
      }, () => {
        if (this.props.onSave && this.isValueChanged()) {
          console.log('Value is changed', this.domElm.textContent);
        }
      });
    };

    cancel = () => {
      this.setState({
        editing: false
      });
    };

    isValueChanged = () => {
      return this.props.value !== this.domElm.textContent
    };

    handleKeyDown = (e) => {
      const { key } = e;
      switch (key) {
        case 'Enter':
        case 'Escape':
          this.save();
          break;
      }
    };

    render() {
      let editOnClick = true;
      const {editing} = this.state;
      if (this.props.editOnClick !== undefined) {
        editOnClick = this.props.editOnClick;
      }
      return (
        <WrappedComponent
          className={editing ? 'editing' : ''}
          onClick={editOnClick ? this.toggleEdit : undefined}
          contentEditable={editing}
          ref={(domNode) => {
            this.domElm = domNode;
          }}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
          {...this.props}
      >
        {this.props.value}
      </WrappedComponent>
      )
    }
  }
}




class Bio extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      userObj: {
        bio: "",
        emailAddress: "",
        firstName: "loading",
        lastName: "loading",
        followers: [{ username: "test" }],
        following: [{ username: "test2" }],
        password: "temp",
        username: "loading",
        profilePic: "temp",
        profilePic_id: "temp"
      }
    }
  }

  componentDidMount()
  {
    if(window.location.pathname === "/")
    {
      axios.get("http://localhost:6969/user/currentuser", { withCredentials: true })
      .then(json => {
        axios.get("http://localhost:6969/users/" + json.data.username)
        .then(json => {
          this.setState({userObj: json.data});
        })
      });
    }
    else
    {
      var temp = window.location.pathname;
      var res = temp.split('/');
      axios.get("http://localhost:6969/users/" + res[2])
      .then(json => {
        this.setState({userObj: json.data});
      });
    }
  }

  render() {
    const userObj = this.state.userObj;
    let EditableH1 = contentEditable('Typography');
  
    return (
      <div>
        <EditableH1 value={userObj.bio}/>
      </div>
    )
  }
}

export default Bio;
