import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Suggestions from './Suggestions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';



const useStyles = theme => ({
    root: {
      flexWrap: 'wrap',
      width: '100%', 
      backgroundColor: '#efefef',
      marginTop: 6,
      marginLeft: 10
    },
    overrides: {
        MuiFormLabel: {
          root: {
            "&$focused": {
              color: "tomato",
              fontWeight: "bold"
            }
          }, 
          
          focused: {}
        }
      },
    margin: {
    },
  });

  class InputField extends Component{
     constructor(props) {
            super(props);
      
            this.state = {
              query: '',
              results: []
            }
      
            this.handleInputChange = this.handleInputChange.bind(this);
          }
          
      
          getInfo() {
            axios.get(`http://localhost:6969/users/${this.state.query}`)
            .then( data  => {
              console.log("Data: " + data.data.username);
              if (!data.data.username) return;
              let newResults = this.state.results;
              newResults.push(data.data.username);
              this.setState({
                results: newResults
              });
            });
          }
      
          handleInputChange() {
            this.setState({
              query: this.search.value
            }, () => {
              if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length > 2) {
                  this.getInfo()
                }
              } 
            })
          }
      render(){
        const { classes } = this.props;
        return (
      <div style = {{width: '100%', marginTop: 13,}}>
        <TextField
        className={classes.root}
        label="Search for an Outfit:"
        variant="outlined"
        id="mui-theme-provider-outlined-input"
         inputRef={input => this.search = input}
          onChange={this.handleInputChange}
        InputProps={{
            disableUnderline: true,
           }}
        style = {{}}
      />
      <Suggestions results={this.state.results} />
      </div>

  );
      }
  }
  InputField.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(InputField);