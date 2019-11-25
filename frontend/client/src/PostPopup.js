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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import pic3 from './images/3.jpeg';




const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  openButton:{
    float: 'right',
    marginTop: 20,
    size: 'small',
  },
});

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

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

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const tile = [
  {
    img: pic3,
    title: 'Image',
    author: 'author',
  },
];


  return (
    <div>
      <Button style = {{float: 'right', marginTop: 20, size: 'small', }} size = 'small'  color="secondary" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog maxWidth = 'md' fullWidth = "true" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          NYFW Vibes
        </DialogTitle>
        <Grid container spacing={0}>
        
        <Grid item xs={5}>
        <img style = {{marginLeft: 20, flex: 1, width: 350, resizeMode: 'contain', }} src={pic3} alt={tile.title} />
        </Grid>
        <Grid item xs={6}>
        <Grid container spacing = {1} style ={{marginBottom: 20,}}>
        <Grid item xs={4}>
        <img style = {{marginLeft: 20, flex: 1, width: 70, resizeMode: 'contain', }} src={pic3} alt={tile.title} />
      </Grid>
      <Grid item xs={8}>
      <Grid container spacing = {1}>
      <Grid item xs = {10}>
      <Typography variant = 'h6'>Gucci Tan Blazer</Typography>

      </Grid>
      <Grid item xs = {2}>
      <Typography color = 'secondary'>$1900</Typography>

      </Grid>

      </Grid>
      <br></br>
      <Typography>https://www.gucci.com/us/en/ca/men/ready-to-wear-for-men-c-men-readytowear</Typography>

    </Grid>
    </Grid>
    <Grid container spacing = {1} style ={{marginBottom: 20,}}>
    <Grid item xs={4}>
    <img style = {{marginLeft: 20, flex: 1, width: 70, resizeMode: 'contain', }} src={pic3} alt={tile.title} />
  </Grid>
  <Grid item xs={8}>
  <Grid container spacing = {1}>
  <Grid item xs = {10}>
  <Typography variant = 'h6'>Gucci Tan Blazer</Typography>

  </Grid>
  <Grid item xs = {2}>
  <Typography color = 'secondary'>$1900</Typography>

  </Grid>

  </Grid>
  <br></br>
  <Typography>https://www.gucci.com/us/en/ca/men/ready-to-wear-for-men-c-men-readytowear</Typography>

</Grid>
</Grid>
<Grid container spacing = {1} style ={{marginBottom: 20,}}>
<Grid item xs={4}>
<img style = {{marginLeft: 20, flex: 1, width: 70, resizeMode: 'contain', }} src={pic3} alt={tile.title} />
</Grid>
<Grid item xs={8}>
<Grid container spacing = {1}>
<Grid item xs = {10}>
<Typography variant = 'h6'>Gucci Tan Blazer</Typography>

</Grid>
<Grid item xs = {2}>
<Typography color = 'secondary'>$1900</Typography>

</Grid>

</Grid>
<br></br>
<Typography>https://www.gucci.com/us/en/ca/men/ready-to-wear-for-men-c-men-readytowear</Typography>

</Grid>
</Grid>
<Grid container spacing = {1} style ={{marginBottom: 20,}}>
<Grid item xs={4}>
<img style = {{marginLeft: 20, flex: 1, width: 70, resizeMode: 'contain', }} src={pic3} alt={tile.title} />
</Grid>
<Grid item xs={8}>
<Grid container spacing = {1}>
<Grid item xs = {10}>
<Typography variant = 'h6'>Gucci Tan Blazer</Typography>

</Grid>
<Grid item xs = {2}>
<Typography color = 'secondary'>$1900</Typography>

</Grid>

</Grid>
<br></br>
<Typography>https://www.gucci.com/us/en/ca/men/ready-to-wear-for-men-c-men-readytowear</Typography>

</Grid>
</Grid>

        </Grid>
        
        
        </Grid>
      </Dialog>
    </div>
  );
}