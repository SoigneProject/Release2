import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Icon from "@material-ui/core/Icon"
import AddCircle from "@material-ui/icons/AddCircle";
import TopMenu from "./TopMenu";
import axios from 'axios';
class PostButton extends React.Component {

    state = {
      isAboutVisible: false,
    }
  
    render() {
     return (
      <div className="Nav">
        <div className="Button-Container">
        <div className="Nav-Text About-Button">
          <h2 onClick={() => this.setState({ isAboutVisible: true }) }>About</h2>
        </div>
        </div>
        { this.state.isAboutVisible ? <Button /> : null }
      </div>
      );
     }
  }

  export default PostButton;
