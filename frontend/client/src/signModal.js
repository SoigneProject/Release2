import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from './soigne.png';
import bgd from './landingbgd.png';
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
    height: 600,
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
 * onSignup takes in the fields on the form, checks if password matches with confirmPassword, and then
 * calls signUp() on backend. If there are issues, there will be error messages displayed on the form. If there
 * are no issues, the user will be signed in and routed to his/her profile page  
 */
function onSignUp(e, history, fn, ln, em, pass, cPass, uname) {
  e.preventDefault();
    const email = em;
    const password = pass;
    const firstName = fn;
    const lastName = ln;
    const username = uname;
    const confirmPassword = cPass;

    if(password !== confirmPassword) //Error catching.
    {
      document.getElementById("errorMessage").innerText = "Password did not match. Please make sure you enter the same password.";
    }
    else
    {
      axios.post('http://localhost:6969/users/signup', {
        firstName: firstName,
        lastName: lastName,
        username: username,
        emailAddress: email,
        password: password,
      }).then(json => {
        if (json.data.success) {
          axios.post('http://localhost:6969/users/signin', {
            username: username,
            password: password,
          }, {
            withCredentials: true
          }).then(json => {
              if (json.data.success) {
                history.push('/');
              } else {
                document.getElementById("errorMessage").innerText = "Sign in failed. Please use the login button to try signing in with your new account.";
              }
            });
          }
          else //Error catching.
          {
            if(json.data.message === "Error: Account already exists with that username.")
            {
              document.getElementById("errorMessage").innerText = "Username already in use. Please try a different username";
            }
            else if(json.data.message === "Error: Account already exists with that email.")
            {
              document.getElementById("errorMessage").innerText = "Email already in use. Please use a different email.";
            }
            else if(json.data.error === 'INVALID INPUTS')
            {
              document.getElementById("errorMessage").innerText = "Please fill out all areas on the form before submitting.";
            }
            else
            {
              document.getElementById("errorMessage").innerText = "Server error. Please try again later.";
            }
          }
        });
    }
}

/**
 * This renders the form for the user to fill out.
 */

export default function ServerModal(props) {
  const {history} = props;
  const classes = useStyles();
  const rootRef = React.useRef(null);
  const [username, setUserName] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        <Typography component="h2" fontsize = {14} align="center" id = "server-modal-title">
          Enter your information and join our growing community! 
          <p 
            id="errorMessage" 
            className={classes.error}
            ></p>
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
            <p>      
            </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary first"
            className={classes.submit}
            onClick = {(e) => onSignUp(e, history, fname, lname, email, password, confirmPassword, username)}
          >
          Sign Up
          </Button><p></p>
       
        <Button
          type="button"
          fullWidth
          variant="contained"
          color= "secondary"
          className={classes.submit}
          onClick = {() => history.push('/login')}
          >
        Have an account? Log in
        </Button>
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