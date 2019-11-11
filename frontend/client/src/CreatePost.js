import React from 'react';
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
import PostButton from "./PostButton";

const Choices = [
    {
      value: '#fallfashion',
      label: '#fallfashion',
    },
    {
      value: '#hotgirlsummer',
      label: '#hotgirlsummer',
    },
    {
      value: '#streetstyle',
      label: '#streetstyle',
    },
    {
      value: '#sunsoutbunsout',
      label: '#sunsoutbunsout',
    },
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
            <TextField
            id="tags"
            select
            label="Tags"
            fullWidth
            className={classes.textField}
            value={values.Choices}
            onChange={handleChange('Choices')}
            SelectProps={{
            native: true,
            MenuProps: {
                className: classes.menu,
            },
            }}
            helperText="Select some tags!"
            margin="normal"
            variant="outlined"
          >
        {Choices.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
          <textarea 
            rows="10"
            cols="75"
            id="desc"
            label="Description"
            placeholder="Enter a description of your post"
            className={classes.textarea}
            value={values.Description}
            onChange={handleChange('Description')}
            margin="normal"
            variant="outlined"
          ></textarea>
        </div>
        </Grid>

        <Grid item xs>
        <Typography style = {titleStyle} align = 'Center' variant="h4" component="h4" >
    Link Us!</Typography>
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
            value={values.price}
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
            value={values.link}
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
            onclick = {createRow()}
            className={classes.submit}> + 
        </Button>
          </div>
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
