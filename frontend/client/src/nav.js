import React, { Component } from "react";
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
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Navigation extends Component {
    constructor(props) {
      super(props)
    }
  
    render() {
      var styles = {
        appBar: {
          flexWrap: 'wrap'
        },
        tabs: {
          width: '100%'
        }
      }
  
      return (
        <AppBar showMenuIconButton={false} style={styles.appBar}>
          <Tabs style={styles.tabs}>
            <Tab label='Most popular ideas'/>
            <Tab label='Latest ideas' />
            <Tab label='My ideas' />
          </Tabs>
        </AppBar>
      )
    }
  }