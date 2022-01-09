import * as React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { HOME_PATH } from "../global/consts";

const useStyles = makeStyles({
    header: {
      background: '#222',
      border: '1px solid black',
      height: 50,
      paddingBottom: 5,
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'left',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 2px black',

    },
    link: {
        textDecoration: 'none',
        fontSize: 24,
        marginLeft: 20,
        color: '#fff',
    },
    logoFirstPart: {
        color: 'rgb(46,104,150)',
    }
  });

const Header = () => {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <Link to={HOME_PATH} className={classes.link}><span className={classes.logoFirstPart}>Github</span>Finder</Link>
        </header>
    )
}

export default Header;
