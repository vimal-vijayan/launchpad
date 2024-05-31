import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyCustomLogoFull from './logo/EssityWhite.png';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 80,
    marginLeft: 40
  },
  path: {
    fill: '#7df3e1',
  },
});

const LogoFull = () => {
  const classes = useStyles();

  return <img src={MyCustomLogoFull} alt="Logo" className={classes.svg} />;
};

export default LogoFull;