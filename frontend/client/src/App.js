// /client/App.js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import InputField from "./InputField";
import TopMenu from "./TopMenu";
import Avatar from "@material-ui/core/Avatar";
import FollowersList from "./FollowersList";
import Grid from "@material-ui/core/Grid";
import "typeface-roboto";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import pic from "./kennet.JPG";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import pic3 from "./3.jpeg";
import pic4 from "./4.jpeg";
import pic5 from "./5.jpeg";
import Signup from "./Signup";
import logo from "./images/soigne.png";
import signModal from "./signModal";
import CreatePost from "./CreatePost";
import Nav from "./nav";
import ForgotPassword from "./ForgotPassword";
import Bio from './Bio';
import { isUndefined } from "util";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userObj: {
        bio: "",
        emailAddress: "",
        firstName: "loading",
        lastName: "loading",
        followers: [{username: "test"}],
        following: [{username: "test2"}],
        password: "temp",
        username: "loading",
        profilePic: "temp",
        profilePic_id: "temp",

      },
      userPosts: [{
        dateTime: "loading",
        description: "temp",
        photo: "temp",
        tags: [],
        title: "loading",
        username: "temp",
      }]
    };

    this.handleFileChange = this.handleFileChange.bind(this);
  }


  handleFileChange(event) {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    axios.put('http://localhost:6969/users/' + this.state.userObj.username, formData)
    .then(json => {
      // console.log(json.data);
      this.setState({userObj: json.data.user})
    });
  }

  componentDidMount() {
    // Retreive user data
    axios.get('http://localhost:6969/user/currentuser', {withCredentials: true})
    .then(json => axios.get('http://localhost:6969/users/' + json.data.username))
    .then(json => {
      this.setState({userObj: json.data});
      axios.get('http://localhost:6969/posts/username/' + this.state.userObj.username)
      .then(json => {
        this.setState({userPosts: json.data});
      });
    });
  }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { userObj, userPosts } = this.state;
    // console.log(userObj);
    // console.log(userPosts);

    const theme = createMuiTheme({
      overrides: {
        // Style sheet name ⚛️
        MuiTypography: {
          // Name of the rule
          textSecondary: {
            // Some CSS
            color: "gray"
          }
        }
      }
    });

    const inputProps = {
      step: 300
    };
    const avatarStyle = {
      alignSelf: "center",
      height: 250,
      width: 250,
      borderWidth: 1
    };

    const paperStyle = {
      padding: 4,
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      marginTop: 20
    };

    const tableStyle = {
      minWidth: 20,
      marginTop: 0,
      marginBottom: 40,
    };

    const tableStyle1 = {
      minWidth: 100,
      marginTop: 0
    };

    const tileStyle = {};

    const gridStyle = {
      marginTop: 20
    };

    const rows = [createData(userObj.followers.length, userObj.following.length)];
    function createData(followers, following) {
      return { followers, following };
    }
    function AvatarLarge(props) {
      return (
        <Avatar src={props.src} alt={props.alt} style={avatarStyle}></Avatar>
      );
    }

    function generateCells() {
      let index = 0;
      let rows = [];
      while (
        index < userObj.followers.length ||
        index < userObj.following.length
      ) {
        rows.push(
          <TableRow>
            <TableCell align="center">
              {index < userObj.followers.length
                ? userObj.followers[index].username
                : ""}
            </TableCell>
            <TableCell align="center">
              {index < userObj.following.length
                ? userObj.following[index].username
                : ""}
            </TableCell>
          </TableRow>
        );
        index++;
      }
      return rows;
    }

    return (
      <div>

        <TopMenu />
        <Grid container spacing={3}>
          <Grid item xs={4}>
          <ForgotPassword></ForgotPassword>
            <div style={paperStyle}>
              <AvatarLarge alt={userObj.profilePic} src={userObj.profilePic}></AvatarLarge>
              <input name="photo" type="file" onChange={this.handleFileChange} />
              <Typography
                align="center"
                variant="h3"
                component="h2"
                gutterBottom
              >
                {userObj.firstName} {userObj.lastName}
              </Typography>
              <Typography
                color="textSecondary"
                align="center"
                variant="h6"
                component="h2"
                gutterBottom
              >
                {userObj.username}
              </Typography>
              <FollowersList>
                <Table style={tableStyle} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Followers</TableCell>
                      <TableCell align="center">Following</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {!userObj
                      ? "you failed"
                      : userObj.followers.map((entry, i) => (
                          <TableRow key={i}>
                            <TableCell align="center">
                              {entry.username}
                            </TableCell>
                            <TableCell align="center">
                              {entry.username}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody> */}
                  <TableBody>
                    {!userObj ? "you failed" : generateCells()}
                  </TableBody>
                </Table>
              </FollowersList>
              <Table style={tableStyle} aria-label="simple table">
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
   
            
            <Bio style = {{marginTop: 20, marginLeft: 8,}}>                {userObj.bio}
</Bio>
             
            </div>
          </Grid>
          <Grid item xs={8}>
            <GridList spacing={1} style={gridStyle} cellHeight={500}>
              {userPosts.map(post => (
                <GridListTile style={tileStyle} key={post.title}>
                  <img src={post.photo} alt={post.photo} />
                  <GridListTileBar
                    title={post.title}
                    subtitle={<span>by: {post.username}</span>}
                    actionIcon={
                      <IconButton aria-label={`info about ${post.title}`}>
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
