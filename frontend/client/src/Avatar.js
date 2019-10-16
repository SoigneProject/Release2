import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 300,
    height: 300,
  },
});

export default function ImageAvatars() {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Avatar className={classes.bigAvatar} />
    </Grid>
  );
}