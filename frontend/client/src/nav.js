import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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