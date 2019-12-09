import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Container from '@material-ui/core/Container';

var user = "";
axios.get('http://localhost:6969/user/currentuser', {withCredentials: true})
.then(json =>  user = json.data.username);

const styles = theme => ({
  root: {
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    color: 'grey',
  },
  openButton:{
    float: 'right',
    marginTop: 20,
    size: 'small',
  },
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

const DialogTitle = withStyles(styles)(props => {
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

function changePassword(e, pass, cpass, npass, cnpass)
{
  //There is no call to unhash/hash password through put method. Therefore, we can't compare the entered password with the account's password.
  //We also can't update the user's password because it will be unhashed.

  //Below is the changePassword (after some changes to test it) that we used. It is flawed.

  /*
  console.log(user);
  axios.get('http://localhost:6969/users/' + user)
  .then(json => {
    console.log(json.data);
    if(pass !== cpass || pass === "" || cpass === "")
    {
      console.log("passwords did not match");
    }
    else if(npass !== cnpass || npass === "" || cnpass === "")
    {
      console.log("new passwords did not match ");
    }
    else
    {
      var temp = json.data;
      temp.password = npass;
      console.log(temp);
      axios.put('http://localhost:6969/users/info/'+user, temp)
      .then(json => {
        console.log("password changed");
      });
    }
  });
  */
};


export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = styles();
  const [values, setValues] = React.useState({
    password: '',
    confirmPass: '',
    newPass: '',
    confirmNew: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
    <Button style = {{marginTop: 20, size: 'small', }} size = 'small'  color="secondary" onClick={handleClickOpen}>
        Change Password      </Button>
      <Dialog fullWidth = "true" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Change your Password
        </DialogTitle>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

      
        <form className={classes.form} Validate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Old Password"
                value={values.password}
                onChange={handleChange('password')}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Confirm Password"
                name="lastName"
                value={values.confirmPass}
                onChange={handleChange('confirmPass')}
                autoComplete="lname"
              />
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                value={values.newPass}
                onChange={handleChange('newPass')}
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
                value={values.confirmNew}
                onChange={handleChange('confirmNew')}
              />
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {(e) => changePassword(e, values.password, values.confirmPass, values.newPass, values.confirmNew)}
            >
              Change your Password
            </Button>

          </Grid>
        
          
       
       
        </form>
      </div>
      <Box mt={5}>
        <copyright/>
      </Box>
    </Container>
    

        
      </Dialog>
    </div>
  );
}


