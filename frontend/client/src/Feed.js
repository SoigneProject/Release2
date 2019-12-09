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

class Feed extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      allPosts: [
        {
          dateTime: "loading",
          description: "temp",
          photo: "temp",
          tags: [],
          title: "loading",
          username: "temp"
        }
      ],
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
          axios.get("http://localhost:6969/posts/")
          .then(json => {
            this.setState({ allPosts: json.data.postObj});
          })
        }
      });
  }

  render()
  {
    const {allPosts} = this.state;
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
      Trending</Typography>
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
  
      {allPosts.map(post => (
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

export default Feed;