import React from 'react';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';


const options = [
  { value: 'chocolate', label: 'Gucci Blazer' },
  { value: 'strawberry', label: 'Gucci Pants' },
  { value: 'vanilla', label: 'Balenciaga Triple S' },
  { value: 'j', label: 'Chanel Mini Rectangular Flap' },
  { value: 'o', label: 'Diorama Bag' },
  { value: '9', label: 'Chloe Nile Bag' },
  { value: 'h', label: 'Hermes Kelly' },


];

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
    }
  },

  control: {
      padding: theme.spacing(1),
      marginTop: 32,
      height: 56,
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
      marginTop: 32,
    },
    menu: {
      width: 200,
    },
}));

class MultiSelectTags extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
      styles = {{backgroundColor: 'white', height: 56, marginTop: 32}}

        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        isMulti = "false"
      />
    );
  }
}

export default MultiSelectTags;