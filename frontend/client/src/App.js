// /client/App.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import InputField from './InputField';
import TopMenu from './TopMenu';
import Avatar from '@material-ui/core/Avatar';
import FollowersList from './FollowersList';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import pic from './kennet.JPG';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import pic3 from './3.jpeg';
import pic4 from './4.jpeg';
import pic5 from './5.jpeg';
import Signup from './Signup';
import logo from './images/soigne.png';
import signModal from './signModal';
import CreatePost from './CreatePost';
  


class App extends Component {
  constructor(props) {
    super(props);   
  }
  state = {
    userObj: undefined,
      };
    componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 1000);
        this.setState({ intervalIsSet: interval });
      }
    }
  
    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }

   getDataFromDb = () => {
        fetch('http://localhost:6969/users/kristinaleopandas')
          .then((res) => res.json())
          .then((userObj) => this.setState({userObj:userObj}));
      };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { userObj } = this.state;  

    const theme = createMuiTheme({
      overrides: {
        // Style sheet name ⚛️
        MuiTypography: {
          // Name of the rule
          textSecondary: {
            // Some CSS
            color: 'gray',
          },
        },
      },
    });

      const inputProps = {
      step: 300,
    };
    const avatarStyle = {
      alignSelf: 'center',
      height: 250,
      width: 250,
      borderWidth: 1,
    };


    const paperStyle = {
      padding: 4,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginTop: 20,
    }

    const tableStyle = {
      minWidth: 20,
      marginTop: 0,
    }

    const tableStyle1 = {
      minWidth: 100,
      marginTop: 0,
    }

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
       ];

   // const rows1 = [
   //   userObj.followers.forEach(element =>{
   //     createData(element, "555");
   //   })
   // ];
    const rows = [
      createData("444", "555"),
    ]
    function createData(followers, following) {
      return { followers, following };
    }
    function AvatarLarge(props){
      return <Avatar src = {props.src} alt = {props.alt} style = {avatarStyle}></Avatar>;
    }

  
    return (
      <div>


    <TopMenu/>
    
    <Grid container spacing={3}>
    <Grid item xs={4}>
      <div style={paperStyle}>
  <AvatarLarge alt="pic" src={pic} ></AvatarLarge>
  <Typography align = 'center' variant="h3" component="h2" gutterBottom>
  Kristina Leo
</Typography>
<Typography color = 'textSecondary' align = 'center' variant="h6" component="h2" gutterBottom>
  @kristinaleopandas
</Typography>
<FollowersList><Table style = {tableStyle} aria-label="simple table">
<TableHead>
  <TableRow>
    <TableCell align="center">Followers</TableCell>
    <TableCell align="center">Following</TableCell>
  </TableRow>
</TableHead>
<TableBody>
          {!userObj
            ? 'you failed'
            : userObj.followers.map((entry) => (
  <TableRow>
  <TableCell align = "center">{entry.username}</TableCell>
  <TableCell align = "center">{entry.username}</TableCell>
</TableRow>
))}
</TableBody>
</Table></FollowersList>
<Table style = {tableStyle} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Followers</TableCell>
            <TableCell align="center">Following</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.followers}</TableCell>
              <TableCell align="center">{row.following}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  <Typography style = {{marginTop: 20, marginLeft: 8,}} color = 'textSecondary' align = 'center'>SF Transplant, NY gal at heart. Combining street style and luxury
  is my passion. Oh, and I also love drinking boba.</Typography>

  </div>
  
    </Grid>
    <Grid item xs={8}>
    <GridList spacing={1} style = {gridStyle} cellHeight={500} >

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
}

export default App;