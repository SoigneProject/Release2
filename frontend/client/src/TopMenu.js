import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputField from './InputField';
import Search from './Search';
import logo from './images/soigne.png';
import Feed from './Feed'
import signModal from './signModal'
import Login from './Login'
import CreatePost from './CreatePost'
import App from './App'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.SignIn();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    textColor: 'black',
    maxwidth: 500,
  },

}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <div style = {{display: 'inline-flex',}}>
    <img src = {logo} alt = "Logo" style = {{width: '16%', height: 76, marginTop: 5,}}/>

    {/* <InputField/> */}
    <Search />
    </div>

      <AppBar position="static" elevation={0}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          tabItemContainerStyle={{width: '400px'}}
          aria-label="nav tabs example"
          
          TabIndicatorProps={{
            style: {
              backgroundColor: "tomato "

            }
          }}
          style = {{backgroundColor: 'white', color: 'black'}}
        >
          <LinkTab label="Sign Up" href="./signModal" {...a11yProps(0)} />
          <LinkTab label="Login" href="./Login" {...a11yProps(1)} />
          <LinkTab label="My Profile" href="/" {...a11yProps(3)} />
          <LinkTab label="Trending" href="./Feed" {...a11yProps(4)} />
          <LinkTab label="Create Post" href="./CreatePost" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      
    </div>
  );
}
// ReactDOM.render(routing, document.getElementById('root'))