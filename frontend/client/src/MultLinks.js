import React, { Component } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';

class MultLinks extends Component {
  constructor() {
    super();
    this.state = {
      add: [],
    };

  }
  
  addInputField = event => {
    const add = this.state.add;
    const size = add.length + 1;
    add.push(size);
    this.setState({
      add
    });
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid>
            <TextField
            id="item"
            label="Item Name"
            style={{ width: 160, marginRight: 20, marginTop: 32}}
            margin="normal"
            variant="outlined"
            />
            <TextField
            id="price"
            label="Price"
            style={{ width: 100, marginTop: 32 }}
            margin="normal"
            variant="outlined"
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />
            <TextField
            id="link"
            label="Link"
            fullWidth
            margin="normal"
            variant="outlined"
            />
        </Grid>
        {this.state.add.map(index => {
        return (
        <Grid>
            <TextField
            id={"item"+index}
            label="Item Name"
            style={{ width: 160, marginRight: 20 , marginTop: 32}}
            margin="normal"
            
            variant="outlined"
            />
            <TextField
            id={"price"+index}
            label="Price"
            style={{ width: 100, marginTop: 32 }}
            margin="normal"
            variant="outlined"
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />
            <TextField
            id={"link"+index}
            label="Link"
            fullWidth
            margin="normal"
            variant="outlined"
            />
        </Grid>
        );
    })}
    </Grid>
        <Button 
        onClick={this.addInputField}
        style={{ marginTop: 30 }}
        variant="contained" color="default">
        {" "}
        Add Item
        </Button>
      </div>
    );
  }
}

export default MultLinks;
