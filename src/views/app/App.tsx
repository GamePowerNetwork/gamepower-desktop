import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { remote, ipcRenderer } from 'electron';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// views
import Login from "../login/Login";
import GameView from "../game-view/GameView";
import Loader from "../loader/Loader";
import AppDashboard from "../app-dashboard/AppDashboard";
import ConfirmationWindow from "../confirmation-window/ConfirmationWindow";
import GrantCollectableWindow from "../grant-collectable-window/GrantCollectableWindow";
import './App.css';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openRequest, setOpenRequest] = useState(false);

  useEffect(() => {
    // Will be moved to the application layer.
    ipcRenderer.on('ping', (event: any, message: any) => {
      setOpenRequest(true);


      remote.getCurrentWindow().setAlwaysOnTop(true, "floating", 1);
      // allows the window to show over a fullscreen window
      remote.getCurrentWindow().setVisibleOnAllWorkspaces(true);

      remote.getCurrentWindow().show();
      
    })

    ipcRenderer.on('grantCollectable', (event: any, message: any) => {
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
    })
  }, [dispatch]);

  const closeRequestWindow = () => {
    setOpenRequest(false);

    remote.getCurrentWindow().setAlwaysOnTop(false);
    // allows the window to show over a fullscreen window
    remote.getCurrentWindow().setVisibleOnAllWorkspaces(true);

    remote.getCurrentWindow().hide();
  };

  const handleDecline = () => {
    ipcRenderer.send('request:declined')
    closeRequestWindow();
  };

  const handleAccept = () => {
    ipcRenderer.send('request:accepted')
    closeRequestWindow();
  };

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Loader}/>
          <Route path="/login" component={Login}/>
          <Route path="/gameview" component={GameView}/>
          <Route path="/appdashboard" component={AppDashboard}/>
          <Route path="/confirmation" component={ConfirmationWindow}/>
          <Route path="/grant-collectable" component={GrantCollectableWindow}/>
        </Switch>
      </Router>
      
      <Dialog
        open={openRequest}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Coin Hunter is requesting access"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To use "Coin Hunter", you must give it access to make calls to the blockchain on your behalf.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDecline} color="secondary">
            Decline
          </Button>
          <Button variant="contained" onClick={handleAccept} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default App;
