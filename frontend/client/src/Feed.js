import React from 'react';
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
    Trending</Typography>
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
            <IconButton aria-label={`info about ${tile.title}`} >
              <InfoIcon />
            </IconButton>
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