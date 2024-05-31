import React from 'react';
import { makeStyles } from '@material-ui/core';
import MyCustomIconFull from './logo/EssityWhite.png';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 30,
    marginBottom: 50
  },
  path: {
    fill: '#7df3e1',
  },
});

const LogoIcon = () => {
  const classes = useStyles();
  return <img src={MyCustomIconFull} alt="Icon" className={classes.svg} />;
};

export default LogoIcon;
