import React from 'react';
import {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import axios from 'axios';

var user = "";
axios.get('http://localhost:6969/user/currentuser', {withCredentials: true})
.then(json =>  user = json.data.username);

class PostPopup extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: "test",
        tags: [{tagName: "test"}],
      },
      items: [{
        name: "test",
        link: "test",
      }],
      open: false,
      owner: true,
    };
  }

  handleClickOpen(){
    let state = false;
    if(this.state.post.username === user)
    {
      state = true;
    }
    if(this.state.open === false)
    {
      this.setState({open: true, owner: state});
    }
  };
  handleClose(){
    if(this.state.open === true)
    {
      this.setState({open: false});
    }
  };
  deletePost(){
    Axios.delete("http://localhost:6969/posts/id/" + this.state.post._id)
    .then(json => {
      this.setState({open: false});
      window.location.assign("http://localhost:3000/")
    });
  }

  componentDidMount(){
    Axios.get("http://localhost:6969/posts/id/" + this.props.id)
    .then(json => {
      if(json.data.items !== undefined)
      {
        this.setState({post: json.data});
        this.state.items.pop();
        for(var i = 0; i < json.data.items.length; i++)
        {
          Axios.get("http://localhost:6969/items/id/" + json.data.items[i]._id)
          .then(json => {
            this.state.items.push(json.data);
            this.setState({items: this.state.items});
          })
        }
      }
    })
  };

  render(){

    let post = this.state.post;
    let items = this.state.items;
    let open = this.state.open;

    const root = {
      margin: 0,
      padding: 2,
    };

    const closeButton = {
      position: 'absolute',
      right: 1,
      top: 1,
      color: "grey",
    };

    const openButton = {
      float: 'right',
      marginTop: 20,
      size: 'small',
    };

    const DialogTitle = withStyles(root, closeButton, openButton)(props => {
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });


    return (
      <div>
        <Button style = {{float: 'right', marginTop: 20, size: 'small', }} size = 'small'  color="secondary" onClick={(e) => this.handleClickOpen()}>
          View
        </Button>
        <Dialog maxWidth = 'md' fullWidth = "true" onClose={(e) => this.handleClose()} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={(e) => this.handleClose()}>
            {post.title} 
            {(this.state.owner) ?  <Button style = {{float: 'right', marginTop: 20, size: 'small', border: '0.5px', }} size = 'small' color="secondary" 
                onClick={(e) => this.deletePost()}>
                  Delete
                </Button> : <div></div>}
          </DialogTitle>
          <Grid container spacing={0}>
          <Grid item xs={5}>
          <div>
          {post.tags.map(tag => (
            <Button style = {{float: 'left', marginTop: 1, marginRight: 3, marginBottom: 3, size: 'small', border: '1.0px',}} variant="contained">{tag.tagName}</Button>
          ))}
          </div>
          <img style = {{marginLeft: 20, flex: 1, width: 350, resizeMode: 'contain', }} src={post.photo} alt={post.photo} />
          </Grid>

          <Grid item xs={6}>
          {items.map(item => (
             <Grid container spacing = {1} style ={{marginBottom: 20,}}>
             <Grid item xs={4}>
             <img style = {{marginLeft: 20, flex: 1, width: 70, resizeMode: 'contain', }} src={post.photo} alt={post.photo} />
           </Grid>
           <Grid item xs={8}>
           <Grid container spacing = {1}>
           <Grid item xs = {10}>
           <Typography variant = 'h6'>Name: {item.name}</Typography>
     
           </Grid>
           <Grid item xs = {2}>
           <Typography color = 'secondary'>Price: ${item.price}</Typography>
     
           </Grid>
     
           </Grid>
           <br></br>
           <Typography>Link: {item.url}</Typography>
     
         </Grid>
         </Grid>
            ))}
            
          </Grid>
          
          
          </Grid>
        </Dialog>
      </div>
    );
  }

}

export default PostPopup;