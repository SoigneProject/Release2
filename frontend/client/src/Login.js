import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from './images/soigne.png';
import bgd from './images/landingbgd.png';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    transform: 'translateZ(0)',
    height: 768,
    flexGrow: 1,
  },

  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(' + bgd + ')',
    backgroundSize: 'cover',
    overflow: 'hidden',

  },
  paper: {
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: '0.5px solid #a9a9a9',
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  error: {
    backgroundColor: "#FFCCCC"
  }
}));

/**
 * After taking in the user's password and username, it will try to sign in the user.
 * If the combination of user and password fail, the form will update saying the user failed to log in.
 * If the combination of user and password work, the user will be routed to his/her profile page.
 */
function onSignIn(e, history, pass, uname) {
  e.preventDefault();
    const password = pass;
    const username = uname;

  // Post request to backend
  axios.post('http://localhost:6969/users/signin', {
    username: username,
    password: password,
  }, {
    withCredentials: true
  }).then(json => {
      if (json.data.success) {
        history.push('/');
      } else {
        document.getElementById("errorMessage").innerText = "Username or password invalid. Please input valid username and password.";
      }
    });
  document.getElementById("errorMessage").innerText = "Username or password invalid. Please input valid username and password.";
}

/**
 * This function renders the login form for the user to fill out.
 */
export default function ServerModal(props) {
  const {history} = props;
  const classes = useStyles();
  const rootRef = React.useRef(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={classes.root} ref={rootRef}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>

          <p id="server-modal-description">
          <Typography align="center" id = "server-modal-title">
          <img src = {logo} alt = "Logo" style = {{width: '100px'}}/>    
          </Typography>
        <Typography component="h2" fontsize = {18} align="center" id = "server-modal-title">
          Welcome Back! 
          <p 
            id="errorMessage" 
            className={classes.error}
            ></p>
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                autoComplete="usrname"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
            <p>      
            </p>

            <Button
          type="submit"
          fullWidth
          variant="contained"
          color= "secondary"
          className={classes.submit}
          onClick = {(e) => onSignIn(e, history, password, username)}
          >
          Log in
        </Button> <p></p>
        
        <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary first"
            className={classes.submit}
            onClick = {() => history.push('/signModal')}
          >
          Not a Member? Sign Up
          </Button><p></p>

        </form>
      <Box mt={5}>
        <copyright/>
      </Box>
          </p>
        </div>
      </Modal>
    </div>
  );
}