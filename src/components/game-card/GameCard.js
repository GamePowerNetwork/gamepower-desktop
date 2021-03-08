import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { openWindow } from '../../application/actions/socket'


const useStyles = makeStyles({
    root: {
      width: 250,
    },
    gameListContainer: {
        marginTop: '30px',
    }
  });

function GameCard(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    // Once all loading is done, go to the login screen
    useEffect(() => {
        
    }, []);



    return (
        <Card elevation={18} raised={true} className={classes.root}>
            <CardActionArea onClick={() => props.enabled ? dispatch(openWindow) : null }>
                <CardMedia
                component="img"
                height="270"
                image={props.image}
                />
                <CardContent>
                <Typography gutterBottom variant="subtitle1">
                    {props.title}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default GameCard;