import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Icon from "@material-ui/core/Icon"
import AddCircle from "@material-ui/icons/AddCircle";
import TopMenu from "./TopMenu";

const Choices = [
    {
      value: '#fallfashion',
      label: '#fallfashion',
    },
    {
      value: '#hotgirlsummer',
      label: '#hotgirlsummer',
    },
    {
      value: '#streetstyle',
      label: '#streetstyle',
    },
    {
      value: '#sunsoutbunsout',
      label: '#sunsoutbunsout',
    },
  ];
  
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    '& > span': {
        margin: theme.spacing(2),
      },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.neutral,
  },
  
  iconHover: {
    '&:hover': {
      color: red[800],
    }
  },
  control: {
      padding: theme.spacing(1),
  },
}));

const titleStyle = {
    marginTop: 20,
    marginBottom: 10,
  }

export default function CenteredGrid() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
      name: '',
      age: '',
      multiline: 'Controlled',
      Choices: '',
    });
  
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

    const createRow = () =>{
        return(
            <div>
            <div className = {classes.paper}>
            <TextField
              id="item"
              label="Item Name"
              className={classes.textField}
              value={values.item}
              onChange={handleChange('item')}
              style = {{width: 160,}}
              margin="normal"
              variant="outlined"
            />
              <TextField
              id="price"
              label="Price"
              className={classes.textField}
              value={values.item}
              style = {{width: 100}}
              onChange={handleChange('price')}
              margin="normal"
              variant="outlined"
            />
              <TextField
              id="link"
              label="Link"
              className={classes.textField}
              fullWidth
              value={values.item}
              onChange={handleChange('link')}
              margin="normal"
              variant="outlined"
            />
            </div>
             <div className ={classes.paper}>
             <Button
               type="submit"
               style = {{width: 40, height: 40, borderRadius: 100, }}
               variant="contained"
               color= "primary"
               onclick = {createRow}
               className={classes.submit}> + 
           </Button>
             </div>
             </div>
            
        );
    };

  return (
    <div className={classes.root}>
      <TopMenu/>
        <Typography style = {titleStyle} align = 'Left' variant="h2" component="h2" >
    Create a Post</Typography>

      <Grid container spacing={3}>
        <Grid item xs>
        <Typography style = {titleStyle} align = 'Center' variant="h4" component="h4" >
    Upload a Photo</Typography>
          <div className={classes.paper}>
          <Button
          type="submit"
          style = {{width: 300, height: 400,}}
          variant="contained"
          color= "neutral"
          className={classes.submit}> <Icon><AddCircle/></Icon>
          </Button>
          </div>
        </Grid>



        <Grid item xs>
        <Typography style = {titleStyle} align = 'Center' variant="h4" component="h4" >
    Describe it</Typography>
          <div className={classes.paper}>
          <TextField
            id="name"
            label="Title"
            fullWidth
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
            />
            <TextField
            id="tags"
            select
            label="Tags"
            fullWidth
            className={classes.textField}
            value={values.Choices}
            onChange={handleChange('tags')}
            SelectProps={{
            native: true,
            MenuProps: {
                className: classes.menu,
            },
            }}
            helperText="Select some tags!"
            margin="normal"
            variant="outlined"
        >
        {Choices.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
        </div>
        </Grid>

        <Grid item xs>
        <Typography style = {titleStyle} align = 'Center' variant="h4" component="h4" >
    Link Us!</Typography>
          <div className = {classes.paper}>
          <TextField
            id="item"
            label="Item Name"
            className={classes.textField}
            value={values.item}
            onChange={handleChange('item')}
            style = {{width: 160,}}
            margin="normal"
            variant="outlined"
          />
            <TextField
            id="price"
            label="Price"
            className={classes.textField}
            value={values.item}
            style = {{width: 100}}
            onChange={handleChange('price')}
            margin="normal"
            variant="outlined"
          />
            <TextField
            id="link"
            label="Link"
            className={classes.textField}
            fullWidth
            value={values.item}
            onChange={handleChange('link')}
            margin="normal"
            variant="outlined"
          />
          </div>
          <div className ={classes.paper}>
          <Button
            type="submit"
            style = {{width: 40, height: 40, borderRadius: 100, }}
            variant="contained"
            color= "primary"
            onclick = {createRow}
            className={classes.submit}> + 
        </Button>
          </div>
        </Grid>
      </Grid>
        
       <Grid item xl>
        <div className ={classes.paper}>      
            <Button
            type="submit"
            style = {{width: 80, height: 60, }}
            variant="contained"
            color= "secondary"
            className={classes.submit}>Post
        </Button>
        </div>
        </Grid> 

    </div>
  );
}