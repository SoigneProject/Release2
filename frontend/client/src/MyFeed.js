import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import TopMenu from './TopMenu';
import PostPopup from './PostPopup';
import axios from 'axios';

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
    }
  }

  
  componentDidMount() {
    // Retreive user data
    axios.get("http://localhost:6969/user/currentuser", {withCredentials: true})
    .then(json => {
      if (!json.data.username) {
        this.props.history.push("/signModal");
      }
      else
      {
        this.state.userPosts.pop();
        this.setState({userPosts: this.state.userPosts});
        axios.get("http://localhost:6969/users/" + json.data.username)
        .then(json => {
          const temp = [];
          for(var i = 0; i < json.data.following.length; i++)
          {
            axios.get("http://localhost:6969/posts/username/" + json.data.following[i].username)
            .then(json => {
              for(var j = 0; j < json.data.length; j++)
              {
                temp.push(json.data[j]);
              }
              this.setState({userPosts: temp});
            });
          }
        });
      }
    });
  }

  render()
  {
    const { userPosts} = this.state;

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
              <PostPopup id={post._id}></PostPopup>
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