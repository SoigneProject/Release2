import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import axios from 'axios';

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

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function onPassChangeSubmit(e, history, oldPass, oldPassConf, newPass, newPassConf) {
  e.preventDefault();
  if (oldPass !== oldPassConf) alert('Old password does not match');
  if (newPass !== newPassConf) alert('New password does not match');
  if (oldPass === newPass) alert('New password must be different than old password');
  const password = newPass;

  // PUT request to backend
  axios.get('http://localhost:6969/user/currentuser', {withCredentials: true})
    .then(json => axios.put('http://localhost:6969/users/' + json.data.username,
      {
        password: password
      },
      {
        withCredentials: true
      }
    ))
    .then(json => {
      if (json.data.success) {
        alert("Password changed");
        history.push("/");
      } else {
        console.log("PASSWORD CHANGE FAILED");
      }
    });
}

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = styles();
  const [oldPass, setOldPass] = useState('');
  const [oldPassConf, setOldPassConf] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConf, setNewPassConf] = useState('');

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

      
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="oldPass"
                variant="outlined"
                required
                fullWidth
                id="oldPass"
                label="Old Password"
                autoFocus
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="oldPassConf"
                label="Confirm Password"
                name="oldPassConf"
                autoComplete="lname"
                value={oldPassConf}
                onChange={(e) => setOldPassConf(e.target.value)}
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
                autoComplete="current-password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
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
                value={newPassConf}
                onChange={(e) => setNewPassConf(e.target.value)}
              />
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onPassChangeSubmit}
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


