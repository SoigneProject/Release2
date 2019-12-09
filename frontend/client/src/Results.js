import React, { Component }  from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import TopMenu from './TopMenu';
import PostPopup from './PostPopup';
import axios from 'axios';

class Results extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      queryPosts: [
        {
          dateTime: "loading",
          description: "temp",
          photo: "temp",
          tags: [],
          title: "loading",
          username: "temp"
        }
      ],
      id: "temp",
      type: "temp",
    }
  }

  
  componentDidMount() {
    // Retreive user data
    const {id, type} = this.props.match.params
    if(type === 'post')
    {
      axios.get("http://localhost:6969/posts/title/" + id)
      .then(json => {
        this.setState({ queryPosts: json.data, id: id, type: type})
      });
    }
    else if(type === 'item')
    {
      axios.get('http://localhost:6969/posts/AllPostsByItem/' + id)
      .then(json => {
        this.setState({ queryPosts: json.data, id: "item " + id, type: "post"})
      });
    }
    else if(type === 'tags')
    {
      axios.get('http://localhost:6969/posts/AllPostsByTag/' + id)
      .then(json => {
        this.setState({queryPosts: json.data, id: "tags " + id, type: "post"})
      });
    }
    else
    {
      this.state.queryPosts.pop();
      this.setState({id: id, type: type})
    }
  }

  render()
  {
    const posts = this.state.queryPosts;
    const {id, type} = this.state;

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
      Search Results for {type} containing {id} </Typography>
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
  
      {posts.map(post => (
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

export default Results;


