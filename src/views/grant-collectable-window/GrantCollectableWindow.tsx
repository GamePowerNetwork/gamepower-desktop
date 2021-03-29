import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { remote, ipcRenderer } from 'electron';

import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea';
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
        maxWidth: "100%",
        minHeight: "100%"
    },
    cardContent: {
        
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
  }));


function GrantCollectableWindow() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        remote.getCurrentWindow().setAlwaysOnTop(true, "normal", 1);
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
        ipcRenderer.send('collectable:declined')
        closeConfirmationWindow();
      };
    
      const handleAccept = () => {
        var storedItems = [];
        const items:string | null = localStorage.getItem("items");

        if(items == null || items.length < 1) {
            storedItems.push({
                title: 'Epic Sword',
                creator: 'Coin Hunter',
                image: 'sword',
                price: 20,
            });

            localStorage.setItem("items", JSON.stringify(storedItems));
        }

        ipcRenderer.send('collectable:accepted')
        closeConfirmationWindow();
      };


    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="480"
                    image="http://localhost:3182/images/sword.png"
                    />
                </CardActionArea>
                <CardContent className={classes.cardContent}>
                    <Typography align="center" gutterBottom variant="subtitle1" component="h2">
                        "Coin Hunter" would like to grant you this collectable item.
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

export default GrantCollectableWindow;
