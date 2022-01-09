import React from "react";
import { ResultDetails } from "../interfaces/ResultDetails";
import Home from "../ui/Home";
import Item from "./Item";
import useRoveFocus from "./useRoveFocus";
import { makeStyles } from '@mui/styles';
import { Divider } from '@mui/material';

const useStyles = makeStyles({
    container: {
        width: 600,
        maxWidth: 1000,
        margin: 'auto',
        marginTop: 20,
        borderRadius: 5,
        background: '#fff',
        overflow: 'hidden',
        display: 'block'
    },
    resultContainer: {
        maxHeight: '70vh !important',
        background: '#fff',
        display: 'flex',
        overflow: 'scroll',
        flexDirection: 'column',
        padding: 10,
    }
});

interface ResultListProps {
    items: ResultDetails[],
    query: string,
    handleSearchParamsChange: (value: string) => void,
}

const ResultList = (props: ResultListProps) => {
    const classes = useStyles();
    const [focus, setFocus] = useRoveFocus(props.items && props.items);

    const handleSetFocus = (value: number, url?: string) => {
        url ? setFocus({ num: value, url: url }) : setFocus({ num: value });
    };

    const getResult = () => {
        if (props.items.length > 0) {
            return (<ul className={classes.resultContainer}>
                {props.items && props.items.map((item, index) => {
                    index++;
                    return <Item
                        key={item.id}
                        setFocus={handleSetFocus}
                        index={index}
                        focus={focus.num === index}
                        item={item} />;
                })}
            </ul>);
        } else {
            return <p className={classes.resultContainer}> No search results 😔 </p>;
        }
    };

    return (
        <div className={classes.container}>
            <Home
                query={props.query}
                handleSearchParamsChange={props.handleSearchParamsChange}
                focus={focus.num === 0}
                setFocus={handleSetFocus} 
            />
            <Divider />
            {getResult()}
        </div>
    );
};

export default ResultList;