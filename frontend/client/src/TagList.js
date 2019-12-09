import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

 
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      justifyContent: 'center',
      '& > span': {
          margin: theme.spacing(2),
        },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.neutral,
    },
    
    iconHover: {
      '&:hover': {
        color: red[800],
      }
    },
    control: {
        padding: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      menu: {
        width: 200,
      },
  }));

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

export default class CreatableInputOnly extends Component {
  state = {
    inputValue: '',
    value: [],
  };
  handleChange = (value, actionMeta) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
  };
  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
        });
        event.preventDefault();
    }
  };
  render() {
    const { inputValue, value } = this.state;
    return (
      <Typography>
      <CreatableSelect 
        style = {useStyles}
        components={components}
        inputValue={inputValue}
        id="outlined-tag"
        variant="outlined"
        label = "Tags"
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Enter your tags"
        value={value}
      />
      </Typography>
    );
  }
}