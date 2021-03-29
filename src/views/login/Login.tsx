import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, makeStyles } from '@material-ui/core';

import { IAccount } from '../../infrastructure/interfaces/IAccount';

import { getLoading, getLoadingMessage } from '../../application/selectors/ui';
import { getActiveAccount, getAccounts, getPhrase, getKeyringInitialized } from '../../application/selectors/keyring';
import { 
  loadAccounts, 
  setActiveAccount, 
  getAccountInfo, 
  subscribeToBalance 
} from '../../application/actions/keyring';

import Signup from '../signup/Signup';
import './Login.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    maxWidth: 445,
    margin: 'auto',
    '& > *': {
      margin: theme.spacing(1),
    },
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



function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(getLoading);
    const loadingMessage = useSelector(getLoadingMessage);
    const activeAccount = useSelector(getActiveAccount);
    const accounts = useSelector(getAccounts);
    const keyringInitialized = useSelector(getKeyringInitialized);

    const [password, setPassword] = useState("");
    const [account, setAccount] = useState<IAccount | undefined>(undefined);

    const classes = useStyles();

  useEffect(() => {
    if(keyringInitialized) {
      dispatch(loadAccounts);
    }
  }, [dispatch, keyringInitialized]);

  useEffect(() => {
    if(accounts.length > 0) {
      setAccount(accounts[0]);
    }
  }, [accounts]);

  useEffect(() => {
    if(activeAccount !== undefined && activeAccount?.accountInfo == undefined) {
      dispatch(getAccountInfo(activeAccount));
    } else if(activeAccount !== undefined && activeAccount?.accountInfo !== undefined) {
      console.log(activeAccount);
      dispatch(subscribeToBalance);
      history.push("/appdashboard");
    }
  }, [history, activeAccount]);

  const selectAccount = (account:any) => {
    dispatch(setActiveAccount(account, password));
  }

  /*
  async function selectAccount() {
    
    // We only display a couple, then unsubscribe
    let count = 0;

    
    // Subscribe to the new headers on-chain. The callback is fired when new headers
    // are found, the call itself returns a promise with a subscription that can be
    // used to unsubscribe from the newHead subscription
    const unsubscribe = await providerConnection.rpc.chain.subscribeNewHeads(async (header) => {
      //console.log(`Chain is at block: #${header.number}`);
      setBlockNumber(`${header.number}`);

      if (++count === 2) {
        unsubscribe();
        dispatch(loadAccounts);
        //dispatch(addAccount("//Alice"));
      }
    });
    //var enc = new TextEncoder();
    //var u8aData = enc.encode("This is a string converted to a Uint8Array!!");
    
  }
  */
  const renderLogin = (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
              {account?.meta?.name}
          </Typography>
          <TextField
              autoFocus
              margin="normal"
              id="login-password"
              label="Password"
              type="password"
              fullWidth
              color="secondary"
              variant="filled"
              onChange={(e) => setPassword(e.target.value)}
            />
        </CardContent>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
              <Button 
                className={classes.btn} 
                variant="contained" 
                size="large" 
                color="primary"
                onClick={(e) => selectAccount(accounts[0])}
              >Login</Button>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <Container maxWidth={false} disableGutters>
        {loading 
          ? (<span>{loadingMessage}</span>)
          : !account
            ? <Signup></Signup>
            : renderLogin
        }
      </Container>
    </div>
  );
}

export default Login;