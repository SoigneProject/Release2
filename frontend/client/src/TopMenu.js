import React from 'react';
import Signup from './signModal';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';
import InputField from './InputField';
import logo from './soigne.png';

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

const theme = createMuiTheme({
        overrides: {
          // Style sheet name ⚛️
  MuiAppBar: {
            // Name of the rule
  colorPrimary: {
              // Some CSS
  backgroundColor: 'white',
            },
          },
        },
      });

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

    <InputField/>
    </div>

      <AppBar style = {{backgroundColor: 'white',}} position="static" elevation={0}>
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
          
          <LinkTab label="About" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Favorites" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Trending" href="/spam" {...a11yProps(2)} />
          <LinkTab label="Kristina" href = "/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      
    </div>
  );
}