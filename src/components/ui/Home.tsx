import React, { useCallback, useEffect, useRef } from 'react'
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles({
    actionContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 10,
    },
    searchBar: {
        width: '96%',
        height: 30,
        fontSize: 16,
        border: 'none',
        marginLeft: 10,
        
    }
  });

interface HomeProps {
    query: string,
    handleSearchParamsChange: (value: string) => void,
    focus: boolean,
    setFocus: (value: number) => void
}

const Home = (props: HomeProps) => {
    const classes = useStyles();
    const ref = useRef(null);

  useEffect(() => {
    if (props.focus) {
      ref.current && ref.current.focus();
    }
  }, [props.focus]);

  const handleSelect = useCallback(() => {
    props.setFocus(0);
  }, [props]);

  return (<section className={classes.actionContainer}>
  <SearchIcon />
    <input type="text" ref={ref} className={classes.searchBar}
      onClick={handleSelect} placeholder="Search..." autoFocus value={props.query} onChange={(e) => props.handleSearchParamsChange(e.target.value)}  />
  </section>);
}

export default Home; 
