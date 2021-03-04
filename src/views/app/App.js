import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// views
import Login from "../login/Login";
import GameView from "../game-view/GameView";
import Loader from "../loader/Loader";
import AppDashboard from "../app-dashboard/AppDashboard";
import './App.css';


// application
import { appInit } from '../../application/actions/ui';
import { initKeyring } from '../../application/actions/keyring';
import { getProviderConnection } from '../../application/selectors/provider';



function App() {
  const dispatch = useDispatch();
  const providerConnection = useSelector(getProviderConnection);

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
    </React.Fragment>
  );
}

export default App;
