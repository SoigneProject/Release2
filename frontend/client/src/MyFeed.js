import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import ReactDOM from 'react-dom'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import pic3 from './images/3.jpeg';
import pic4 from './images/4.jpeg';
import pic5 from './images/5.jpeg';
import TopMenu from './TopMenu';
import PostPopup from './PostPopup';
import axios from 'axios';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

class MyFeed extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      userPosts: [
        {
          dateTime: "loading",
          description: "temp",
          photo: "temp",
          tags: [],
          title: "loading",
          username: "temp"
        }
      ],
      username: "temp",
      following: [{username: "temp"}],
      isAuthenticating: true,
    }
  }

  
  componentDidMount() {
    // Retreive user data
    axios
      .get("http://localhost:6969/user/currentuser", { withCredentials: true })
      .then(json => {
        if (!json.data.username) {
          this.props.history.push("/signModal");
        } else {
          axios
            .get("http://localhost:6969/users/" + json.data.username)
            .then(json => {
              this.setState({ username: json.data.username, following: json.data.following, isAuthenticating: false });
              this.state.userPosts.pop();
              for(var i = 0; i < this.state.following.length; i++)
              {
                axios.get("http://localhost:6969/posts/username/" + this.state.following[i].username)
                .then(json => {
                  this.state.userPosts.push(json.data);
                });
              }
              this.setState({userPosts: this.state.userPosts})
            });
        }
      });
  }

  render()
  {
    if (this.state.isAuthenticating) return null;

    const { userPosts} = this.state;

    const theme = createMuiTheme({
      '@global' : {
        body: {
          backgroundColor: "white",
        }
      }
    });

    const paperStyle = {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }

    const avatarStyle = {
      margin: 1,
      backgroundColor: "gray",
    }

    const formStyle = {
      width: '100%', // Fix IE 11 issue.
      marginTop: 3,
    }

    const submitStyle = {
      marginTop: 3,
      marginBottom: 0,
      marginRight: 2,
    }

    const tileStyle = {
  
    }
  
    const gridStyle = {
      marginTop: 20,
  
    }

    const titleStyle = {
      marginTop: 20,
    }

    return (
      <div>
      <TopMenu></TopMenu>
      <Grid container spacing={3}>
      <Grid item xs={6}>
      <Typography style = {titleStyle} align = 'Left' variant="h3" component="h2" >
      My Feed</Typography>
      </Grid>
      <Grid item xs = {6}>
      <Button style = {{marginTop: 28, padding: 10, marginRight: 40, float: 'right'}} variant="contained" color="secondary" className="button" href="./CreatePost">
      Create Post
    </Button>
    </Grid>
    </Grid>
      <Grid container spacing={3}>
      <Grid item xs={12}>
      <GridList cols = {4} spacing={5} style = {gridStyle} cellHeight={500} >
  
      {userPosts.map(post => (
        <GridListTile style = {tileStyle} key={post.title}>
          <img src={post.photo} alt={post.photo} />
          <GridListTileBar
            title={post.title}
            subtitle={<span>by: {post.username}</span>}
            actionIcon={
              <PostPopup></PostPopup>
            }
          />
        </GridListTile>
      ))}
    </GridList>
    
      </Grid>
      
    
    </Grid>
    </div>
  
    );
  }
}

export default MyFeed;

/*
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Feed() {
  const classes = useStyles();
  const tileStyle = {

  }

  const gridStyle = {
    marginTop: 20,

  }
  const tileData = [
      
      {
        img: pic3,
        title: 'Image',
        author: 'author',
      },
      {
        img: pic4,
        title: 'Image',
        author: 'author',
      },
      {
        img: pic5,
        title: 'Image',
        author: 'author',
      },
      {
        img: pic3,
        title: 'Image',
        author: 'author',
      },

      {
        img: pic3,
        title: 'Image',
        author: 'author',
      },
      {
        img: pic4,
        title: 'Image',
        author: 'author',
      },
      {
        img: pic5,
        title: 'Image',
        author: 'author',
      },
      {
        img: pic3,
        title: 'Image',
        author: 'author',
      },

      {
        img: pic3,
        title: 'Image',
        author: 'author',
      },
      {
        img: pic4,
        title: 'Image',
        author: 'author',
      },
      {
        img: pic5,
        title: 'Image',
        author: 'author',
      },
      {
        img: pic3,
        title: 'Image',
        author: 'author',
      },
     ];
     const titleStyle = {
       marginTop: 20,
     }

  return (
    <div>
    <TopMenu></TopMenu>
    <Grid container spacing={3}>
    <Grid item xs={6}>
    <Typography style = {titleStyle} align = 'Left' variant="h3" component="h2" >
    My Feed</Typography>
    </Grid>
    <Grid item xs = {6}>
    <Button style = {{marginTop: 28, padding: 10, marginRight: 40, float: 'right'}} variant="contained" color="secondary" className={classes.button}>
    Create Post
  </Button>
  </Grid>
  </Grid>
    <Grid container spacing={3}>
    <Grid item xs={12}>
    <GridList cols = {4} spacing={5} style = {gridStyle} cellHeight={500} >

    {tileData.map(tile => (
      <GridListTile style = {tileStyle} key={tile.img}>
        <img src={tile.img} alt={tile.title} />
        <GridListTileBar
          title={tile.title}
          subtitle={<span>by: {tile.author}</span>}
          actionIcon={
            <PostPopup></PostPopup>
          }
        />
      </GridListTile>
    ))}
  </GridList>
  
    </Grid>
    
  
  </Grid>
  </div>

  );
}
*/