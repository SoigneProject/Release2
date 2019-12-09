// /client/App.js
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TopMenu from "./TopMenu";
import Avatar from "@material-ui/core/Avatar";
import FollowersList from "./FollowersList";
import Grid from "@material-ui/core/Grid";
import "typeface-roboto";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ForgotPassword from "./ForgotPassword";
import Bio from "./Bio";
import PostPopup from './PostPopup';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userObj: {
        bio: "",
        emailAddress: "",
        firstName: "loading",
        lastName: "loading",
        followers: [{ username: "test" }],
        following: [{ username: "test2" }],
        password: "temp",
        username: "loading",
        profilePic: "temp",
        profilePic_id: "temp"
      },
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
      isAuthenticating: true
    };

    this.handleFileChange = this.handleFileChange.bind(this);
  }

  /**
   * When user uploads a photo, this function will handle the change in profile picture by
   * calling a User PUT to update the user's profilePic attribute.
   */
  handleFileChange(event) {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    axios
      .put(
        "http://localhost:6969/users/photo/" + this.state.userObj.username,
        formData
      )
      .then(json => {
        this.setState({ userObj: json.data.user });
      });
  };

  /**
   * When user clicks on the logout button, this function will notify the user that he/she is
   * logging out and then log out the user. This will route the user to the signup page.
   */
  logout() {
    console.log("hello");
    axios.get("http://localhost:6969/users/logout", { withCredentials: true })
    .then(json => {
      if (json.data.loggedOut) {
        alert("Logged out");
        window.location.assign('/');
      }
    });
  };

  /**
   * This calls all the API needed to get the user and setup the user's profile page.
   */
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
              this.setState({ userObj: json.data, isAuthenticating: false });
              axios
                .get(
                  "http://localhost:6969/posts/username/" +
                    this.state.userObj.username
                )
                .then(json => {
                  this.setState({ userPosts: json.data });
                });
            });
        }
      });
  }

  /**
   * Renders the user's profile page.
   */
  render() {
    if (this.state.isAuthenticating) return null;

    const { userObj, userPosts } = this.state;

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
      marginBottom: 40
    };

    const tileStyle = {};

    const gridStyle = {
      marginTop: 20
    };

    const rows = [
      createData(userObj.followers.length, userObj.following.length)
    ];
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
              <AvatarLarge
                alt={userObj.profilePic}
                src={userObj.profilePic}
              ></AvatarLarge>
              <input
                name="photo"
                type="file"
                onChange={this.handleFileChange}
              />
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

              <Bio style={{ marginTop: 20, marginLeft: 8 }}></Bio>
              <Button style = {{marginTop: 70, padding: 10, marginLeft: 15, float: 'right'}} variant="contained" color="secondary" className="button" onClick={(e) => this.logout()}>
              Log Out
              </Button>
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

App.propTypes = {
  history: PropTypes.any
};

export default App;
