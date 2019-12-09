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
import TagList from './TagList.js';
import MultLinks from './MultLinks.js';

var user = "";
axios.get('http://localhost:6969/user/currentuser', {withCredentials: true})
.then(json =>  user = json.data.username);

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
  error: {
    backgroundColor: "#FFCCCC",
    marginBottom: 0,
  },
}));

const titleStyle = {
    marginTop: 20,
    marginBottom: 10,
  }

function createPost(e, history, ph, ti, desc) {
  let tags = document.getElementById("outlined-tag").innerText.split("\n");
  var count = 0;
  var item = "item";
  var itemCount = item;
  var link = "link";
  var linkCount = link;
  var price = "price";
  var priceCount = price;
  var madePost = "";
  e.preventDefault();
  if(ti === "" || desc === "")
  {
    document.getElementById("errorMessage").innerText = "Title or Description left empty. please fill out both fields.";
  }
  else if(ph === "")
  {
    document.getElementById("errorPhoto").innerText = "Please insert a photo.";
  }
  else
  {
    const formData = new FormData();
    formData.append("file", ph);
    formData.append("title", ti);
    formData.append("description", desc);
    formData.append("username", user);
    axios.post("http://localhost:6969/posts", formData)
    .then(json => {
      if (json.data.created) { //Creates post
        axios.get("http://localhost:6969/posts/username/" + user) //Get post
        .then(json => {
          madePost = json.data[json.data.length-1];
          for(let i = 0; i < tags.length; i++)
          {
            axios.put("http://localhost:6969/posts/addTag/" + madePost._id, {
              tagName: tags[i],
            })
          }
          while(document.getElementById(itemCount) !== null && document.getElementById(linkCount) !== null && document.getElementById(priceCount) !== null)
          {
              let itemName = document.getElementById(itemCount).value;
              let linkName = document.getElementById(linkCount).value;
              let priceValue = document.getElementById(priceCount).value;
              if(itemName === "" || linkName === "" || priceValue === "")
              {
                console.log("no items linked to this post");
              }
              else
              {
                axios.post('http://localhost:6969/items', { 
                  name: itemName,
                  url: linkName,
                  clothingCategory: "test",
                  retailerID: "1111",
                  price: priceValue,
                }).then(json => {
                  console.log(itemName);
                  axios.get('http://localhost:6969/items/name/' + itemName)
                  .then(json => {
                    axios.put('http://localhost:6969/posts/addItem/' + madePost._id, {
                      itemID: json.data[json.data.length-1]._id,
                      itemName: json.data[json.data.length-1].name,
                    }).then(json => {
                      console.log("Done!");
                    })
                  });
                });
              }
            count = count + 1;
            itemCount = item+count;
            linkCount = link+count;
            priceCount = price+count;  
          }
          history.push('/');
        });
      } else {
        // Handle failed post creation?
        console.log("POST CREATION FAIL");
      }
    });
  }
}

export default function CenteredGrid(props) {
    const classes = useStyles();
    const {history} = props;
    const [values, setValues] = React.useState({
      title: '',
      description: '',
      multiline: 'Controlled',
      Choices: '',
      photo: '',
    });

  
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

    const handleFileChange = name => event => {
      setValues({ ...values, [name]: event.target.files[0] });
      console.log(values.photo);
    }

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
        <Typography style = {titleStyle} align = 'Left' variant="h2" component="h2" >
    Create a Post</Typography>

      <Grid container spacing={3}>
        <Grid item xs>
        <Typography style = {titleStyle} align = 'Center' variant="h4" component="h4" >
    Upload a Photo
            <p 
            id="errorPhoto" 
            className={classes.error}
            ></p>
          </Typography>
          <div className={classes.paper}>
          <Button
          name="photo"
          type="file"
          style = {{width: 300, height: 400,}}
          variant="contained"
          color= "neutral"
          className={classes.submit}
          value={values.photo}
          onChange={handleFileChange()}> <Icon><AddCircle/></Icon>
          </Button>
          <input name="photo" type="file" onChange={handleFileChange('photo')} />
          </div>
        </Grid>

        <Grid item xs>
        <Typography id="describe" style = {titleStyle} align = 'Center' variant="h4" component="h4" >
    Describe it          
            <p 
            id="errorMessage" 
            className={classes.error}
            ></p>
          </Typography>
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
                onChange={handleChange('description')}
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
            onClick = {(e) => createPost(e, history, values.photo, values.title, values.description)}
            className={classes.submit}>Post
        </Button>
        </div>
        </Grid> 

    </div>
  );
}
