import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { remote, ipcRenderer } from 'electron';

import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Avatar, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
    },
    card: {
        minHeight: "100%",
      margin: 'auto',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    cardContent: {
        minHeight: "70%",
    },
    btn: {
      width: '100%',
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(17),
      height: theme.spacing(17),
    },
    phrase: {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.h5.fontSize,
      color: theme.palette.warning.main,
      textAlign: 'center',
      marginTop: '50px',
      marginBottom: '50px',
    },
  }));


function ConfirmationView() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        remote.getCurrentWindow().setAlwaysOnTop(true, "floating", 1);
        // allows the window to show over a fullscreen window
        remote.getCurrentWindow().setVisibleOnAllWorkspaces(true, {visibleOnFullScreen: true});

        remote.getCurrentWindow().show();
    }, [dispatch]);

    const closeConfirmationWindow = () => {
    
        //remote.getCurrentWindow().setAlwaysOnTop(false);
        // allows the window to show over a fullscreen window
        //remote.getCurrentWindow().setVisibleOnAllWorkspaces(false);
    
        remote.getCurrentWindow().close();
      };
    
      const handleDecline = () => {
        ipcRenderer.send('request:declined')
        closeConfirmationWindow();
      };
    
      const handleAccept = () => {
        ipcRenderer.send('request:accepted')
        closeConfirmationWindow();
      };


    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography align="center" gutterBottom variant="subtitle1" component="h2">
                        To use "Coin Hunter", you must give it access to make calls to the blockchain on your behalf.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={handleDecline} color="secondary">
                        Decline
                    </Button>
                    <Button variant="contained" onClick={handleAccept} color="primary" autoFocus>
                        Accept
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
}

export default ConfirmationView;
