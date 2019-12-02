import React from 'react';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';


const options = [
  { value: 'chocolate', label: '#hotgirlsummer' },
  { value: 'strawberry', label: '#kennethLee' },
  { value: 'vanilla', label: '#kristinaandkennetharehot' },
  { value: 'j', label: '#thots' },
  { value: 'o', label: '#hotties' },
  { value: '9', label: '#luv' },
  { value: 'h', label: '#anthonystopflaming' },


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
      font: 'inherit',
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
      style = {{backgroundColor: 'white', marginTop: '20', fontFamily: 'Segoe UI'}}

        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        isMulti = "true"
      />
    );
  }
}

export default MultiSelectTags;