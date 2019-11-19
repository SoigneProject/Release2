import React from 'react';
import { Component } from 'react';
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
import TagList from './TagList.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import MultLinks from './MultLinks.js';
import PostButton from './PostButton';
 
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
}));

const titleStyle = {
    marginTop: 20,
    marginBottom: 10,
  }

function createPost(e, history, ti, desc, iname, ilink) {
  e.preventDefault();
  // Post request to backend
  axios.post('http://localhost:6969/posts', {
    title: ti,
    description: desc,
    photo: "Temporary",
  }).then(json => {
    console.log(json);
    if (json.data.created) { //Creates post
      console.log("POST CREATION SUCCESS");
      axios.post('http://localhost:6969/items', {
        name: iname,
        url: ilink,
        clothingCategory: "test",
        retailerID: "1235",
      }).then(json => {
        if (json.data.created) {
          console.log("ITEM CREATION SUCCESS");
          history.push('/');
        } else {
          console.log("ITEM CREATION FAIL");
          history.push('/');    // Temporary redirect
        }
      })
    } else {
      // Handle failed post creation?
      console.log("POST CREATION FAIL");
    }
  });
}

export default function CenteredGrid(props) {
    const classes = useStyles();
    const {history} = props;
    const [values, setValues] = React.useState({
      name: '',
      age: '',
      multiline: 'Controlled',
      Choices: '',
    });
    const state = {
      clicked: false
    };

  
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

    const createRow = () =>{
        return(
            <div>
            <div className = {classes.paper}>
            <TextField
              id="item"
              label="Item Name"
              className={classes.textField}
              value={values.item}
              onChange={handleChange('item')}
              style = {{width: 160,}}
              margin="normal"
              variant="outlined"
            />
              <TextField
              id="price"
              label="Price"
              className={classes.textField}
              value={values.item}
              style = {{width: 100}}
              onChange={handleChange('price')}
              margin="normal"
              variant="outlined"
            />
              <TextField
              id="link"
              label="Link"
              className={classes.textField}
              fullWidth
              value={values.item}
              onChange={handleChange('link')}
              margin="normal"
              variant="outlined"
            />
            </div>
             <div className ={classes.paper}>
             <Button
               type="submit"
               style = {{width: 40, height: 40, borderRadius: 100, }}
               variant="contained"
               color= "primary"
               onclick = {createRow}
               className={classes.submit}> + 
           </Button>
             </div>
             </div>
            
        );
    };

  return (
    <div className={classes.root}>
      <TopMenu/>
      <PostButton></PostButton>
        <Typography style = {titleStyle} align = 'Left' variant="h2" component="h2" >
    Create a Post</Typography>

      <Grid container spacing={3}>
        <Grid item xs>
        <Typography style = {titleStyle} align = 'Center' variant="h4" component="h4" >
    Upload a Photo</Typography>
          <div className={classes.paper}>
          <Button
          type="submit"
          style = {{width: 300, height: 400,}}
          variant="contained"
          color= "neutral"
          className={classes.submit}> <Icon><AddCircle/></Icon>
          </Button>
          </div>
        </Grid>

        <Grid item xs>
        <Typography style = {titleStyle} align = 'Center' variant="h4" component="h4" >
    Describe it</Typography>
          <div className={classes.paper}>
          <TextField
            id="name"
            label="Title"
            fullWidth
            className={classes.textField}
            value={values.title}
            onChange={handleChange('title')}
            margin="normal"
            variant="outlined"
            />
          <TagList></TagList>
          <TextField
                id="desc"
                label="Description"
                fullWidth
                className={classes.textField}
                value={values.description}
                onChange={handleChange('Description')}
                margin="normal"
                variant="outlined"
                />
        </div>
        </Grid>

        <Grid item xs>
        <Typography style = {titleStyle} align = 'Center' variant="h4" component="h4" >
    Link Us!</Typography>
        <MultLinks></MultLinks>
        </Grid>
      </Grid>
        
       <Grid item xl>
        <div className ={classes.paper}>      
            <Button
            type="submit"
            style = {{width: 80, height: 60, }}
            variant="contained"
            color= "secondary"
            onClick = {(e) => createPost(e, history, values.title, values.Description, values.item, values.link)}
            className={classes.submit}>Post
        </Button>
        </div>
        </Grid> 

    </div>
  );
}
