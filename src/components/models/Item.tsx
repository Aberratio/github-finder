import React, { useEffect, useRef, useCallback } from "react";
import { ResultDetails } from "../interfaces/ResultDetails";
import { makeStyles } from '@mui/styles';
import PersonIcon from '@mui/icons-material/Person';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { ResultType } from "../interfaces/ResultType";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { MAX_OBJECT_NAME_LENGTH } from "../global/consts";

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
        fontSize: 14,
        padding: 0,
    },
    item: {
        display: 'flex',
        borderRadius: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignContent: 'flex-end',
        justifyContent: 'space-between',
        alignItems: 'center',
        listStyleType: 'none',
        listStyle: 'none',
        paddingLeft: 10,
        paddingRight: 10,

        "&:focus": {
            background: '#f4f4f4',
            border: 'none',
            borderRadius: 5,
        },
        "&:focus-visible": {
            background: '#f4f4f4',
            border: 'none !important',
            borderRadius: 5,
            outline: 'none'
        },
    },
    tagUser: {
        background: 'rgb(46,104,150)',
        padding: '0 10px',
        borderRadius: 5,
        textTransform: 'lowercase',
        color: '#fff',
        margin: 0,
        marginLeft: 5,
        fontSize: 12,
        lineHeight: '1.7'
    },
    tagRepository: {
        background: 'rgb(184,0,0)',
        padding: '0 10px',
        borderRadius: 5,
        textTransform: 'lowercase',
        color: '#fff',
        margin: 0,
        marginLeft: 5,
        fontSize: 12,
        lineHeight: '1.7'
    },
    objectTypeContainer: {
        width: 150,
        display: 'flex',
        justifyContent: 'flex-start',
    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    objectName: {
        margin: 0,
        marginRight: 10,
        padding: 0
    }
});

interface ItemProps {
    key: number,
    item: ResultDetails,
    focus: boolean,
    index: number,
    setFocus: (value: number, url: string) => void
}

const Item = (props: ItemProps) => {
    const classes = useStyles();
    const ref = useRef(null);

    useEffect(() => {
        if (props.focus) {
            ref.current.focus();
        }
    }, [props.focus]);

    const handleSelect = useCallback(() => {
        props.setFocus(props.index, props.item.url);
    }, [props]);

    const getName = () => {
        if(props.item.name.length < MAX_OBJECT_NAME_LENGTH) {
            return props.item.name;
        } else {
            return props.item.name.slice(0, MAX_OBJECT_NAME_LENGTH) + "...";
        }
    };

    return (
        <li
            tabIndex={props.focus ? 0 : -1}
            role="button"
            ref={ref}
            onClick={handleSelect}
            onKeyDown={handleSelect}
            className={classes.item}
        >
            {props.item.type === ResultType.USER ?
                <div className={classes.objectTypeContainer}>
                    <PersonIcon /> <p className={classes.tagUser}>{ResultType.USER}</p>
                </div>
                :
                <div className={classes.objectTypeContainer}>
                    <FolderSpecialIcon /> <p className={classes.tagRepository}>{ResultType.RESPOSITORY}</p>
                </div>
            }
            <a href={props.item.url} className={classes.link} target="_blank" rel="noreferrer" >
                <div className={classes.linkContainer}>
                <p className={classes.objectName}>{getName()}</p>
                    <ExitToAppIcon />
                </div>
            </a>

        </li>
    );
};

export default Item;