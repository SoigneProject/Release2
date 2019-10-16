import React, { Component } from 'react';
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
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Feed from "./Feed";
/* 

still figuring routing out for login/signup!!!
const routing = (
  <Router>
  <Link to="/Feed">          
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    //className={classes.submit}>
    >Have an account? Log in</Button>
  </Link>
  <Route path = "/Feed" component = {Feed} />
  </Router>
)

*/

const useStyles = theme => ({
  paper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 5,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 5,
  },
  submit: {
    margin: 3,
  },
});

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpError: '',
      email: '',
      password: '',
      confirmedPassword: '',
      username: '',
      firstName: '',
      lastName: ''
    };

    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

render(){
  const { classes } = this.props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h4">
          Welcome
        </Typography>
        <Typography component="h2" variant="h5" align="center">
          Enter your information and join our growing community!
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
                //autoComplete="current-password"
              />
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSignUp}
            >
              Sign Up
            </Button>

          </Grid>
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          Sign Up
          </Button>
       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}>Have an account? Log in</Button>

        </form>
      </div>
      <Box mt={5}>
        <copyright/>
      </Box>
    </Container>
  );
}
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Signup);