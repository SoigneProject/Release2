import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Search from './Search';
import logo from './images/soigne.png';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

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
        //event.SignIn();
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
const useStyles1 = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

 

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes1 = useStyles1();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes1.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Sign Up', 'Login', 'My Profile', 'Trending'].map((text, index) => (
          <MenuItem button key={text} href="/signModal">
            <ListItemText primary={text} href="/signModal"/>
          </MenuItem>
        ))}
      </List>
      <Divider />
     
    </div>
  );

  return (
    <div className={classes.root}>
    <div style = {{display: 'inline-flex',}}>
    <img src = {logo} alt = "Logo" style = {{width: '16%', height: 76, marginTop: 5,}}/>

    {/* <InputField/> */}
    <Search />
    
    </div>
    {/*<div style = {{display: 'inline-block', float: 'right', marginTop: 27, marginRight: 10,}}>
    <Button onClick={toggleDrawer('right', true)}><MenuIcon></MenuIcon></Button>
    <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
    {sideList('right')}
  </Drawer>
  </div>
  */}
      <AppBar position="static" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          tabItemContainerStyle={{width: '400px'}}
          aria-label="nav tabs example"
          
          TabIndicatorProps={{
            style: {
              backgroundColor: "white "

            }
          }}
          style = {{backgroundColor: 'white', color: 'black'}}
        >
        
          <LinkTab label="My Profile" href="/" {...a11yProps(3)} />
          <LinkTab label="Trending" href="/Feed" {...a11yProps(4)} />
          <LinkTab label="Create Post" href="/CreatePost" {...a11yProps(5)} />
          <LinkTab label="My Feed" href="/MyFeed" {...a11yProps(6)} />

        </Tabs>
      </AppBar>
      
    </div>
  );
}