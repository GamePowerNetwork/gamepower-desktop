import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// views
import Login from "../login/Login";
import GameView from "../game-view/GameView";
import Loader from "../loader/Loader";
import AppDashboard from "../app-dashboard/AppDashboard";
import WindowBar from "../../components/window-bar/WindowBar";
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Fab from '@material-ui/core/Fab';

// application
import { appInit } from '../../application/actions/ui';
import { initKeyring } from '../../application/actions/keyring';
import { getProviderConnection } from '../../application/selectors/provider';


const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function App() {
  const dispatch = useDispatch();
  const providerConnection = useSelector(getProviderConnection);
  const classes = useStyles();

  // Init the app
  useEffect(() => {
    dispatch(appInit);
  }, [dispatch]);

  // Init the keyring once the provider connection is ready
  useEffect(() => {
    if(providerConnection !== null) {
      dispatch(initKeyring);
    }
  }, [dispatch, providerConnection]);

  function openDevTools() {
    const remote = (window.require) ? window.require("electron").remote : null;
    const WIN = remote.getCurrentWindow();
    WIN.openDevTools();
  }

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Loader}/>
          <Route path="/login" component={Login}/>
          <Route path="/gameview" component={GameView}/>
          <Route path="/appdashboard" component={AppDashboard}/>
        </Switch>
      </Router>
      <Fab className={classes.fab} onClick={() => openDevTools()}>
          <KeyboardArrowUpIcon />
      </Fab>
    </React.Fragment>
  );
}

export default App;
