import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar, makeStyles } from '@material-ui/core';

import { getLoading, getLoadingMessage } from '../../application/selectors/ui';
import { getActiveAccount, getAccounts, getPhrase, getKeyringInitialized } from '../../application/selectors/keyring';
import { 
  loadAccounts, 
  setActiveAccount, 
  getAccountInfo, 
  generatePhrase, 
  addAccount, 
  subscribeToBalance 
} from '../../application/actions/keyring';
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
    const phrase = useSelector(getPhrase);
    const keyringInitialized = useSelector(getKeyringInitialized);

    const [openSignup, setSignupOpen] = useState(false);
    const [openPhraseWindow, setOpenPhraseWindow] = useState(false);
    const [openNameWindow, setOpenNameWindow] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [phraseSaved, setPhraseSaved] = useState(false);
    const [username, setUsername] = useState("");
    const [account, setAccount] = useState(null);

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
    if(activeAccount !== null && activeAccount.accountInfo == null) {
      dispatch(getAccountInfo(activeAccount));
    } else if(activeAccount !== null && activeAccount.accountInfo !== null) {
      dispatch(subscribeToBalance);
      history.push("/appdashboard");
    }
  }, [history, activeAccount]);

  useEffect(() => {
    if(password === passwordConfirm && password.length > 5) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    if(passwordMatch) {
      setErrorText("");
    } else {
      setErrorText("Passwords do not match");
    }
  }, [passwordMatch]);

  useEffect(() => {
    if(phrase) {
      setOpenPhraseWindow(true);
    }
  }, [phrase]);

  useEffect(() => {
    if(phraseSaved) {
      setOpenNameWindow(true);
    }
  }, [phraseSaved]);

  const handleClickOpen = () => {
    setSignupOpen(true);
  };

  const handleClose = () => {
    setSignupOpen(false);
  };

  const submitPassword = () => {
    setSignupOpen(false);
    dispatch(generatePhrase);
  };

  const handleCreateAccount = () => {
    dispatch(addAccount(phrase, password, username))

    setPassword("");
    setUsername("");
  }


  const selectAccount = (account) => {
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
              {account?.meta.name}
          </Typography>
          <TextField
              autoFocus
              margin="normal"
              id="login-password"
              label="Confirm Password"
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

  const renderSignUp = (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
              GamePower
          </Typography>
        </CardContent>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
              <Button 
                className={classes.btn} 
                variant="contained" 
                size="large" 
                color="primary"
                onClick={handleClickOpen}
              >Create New Account</Button>
          </Typography>
        </CardContent>
      </Card>

      <Dialog open={openSignup} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter a password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your personal information never leaves your device, and this password helps keep it safe.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="password"
            label="Password"
            type="password"
            fullWidth
            color="secondary"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            autoFocus
            margin="normal"
            id="password-confirm"
            label="Confirm Password"
            type="password"
            fullWidth
            color="secondary"
            variant="filled"
            error={!passwordMatch}
            helperText={errorText}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={submitPassword} color="secondary" disabled={!passwordMatch}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPhraseWindow} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">These are your secret words.</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Your secret words will be able to re-generate your secure keys. If you lose your keys you will not be able to access your accounts.
          </DialogContentText>

          <DialogContentText className={classes.phrase}>
            {phrase}
          </DialogContentText>

          <Button 
                className={classes.btn} 
                variant="contained" 
                size="large" 
                color="primary"
                onClick={() => setOpenNameWindow(true)}
              >I HAVE SAVED MY 12 WORD PHASE</Button>
 
        </DialogContent>
      </Dialog>

      <Dialog open={openNameWindow} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter a username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What would you like to be called?
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="username"
            label="Username"
            type="text"
            fullWidth
            color="secondary"
            variant="filled"
            onChange={(e) => setUsername(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
        <Button 
          className={classes.btn} 
          variant="contained" 
          size="large" 
          color="primary"
          onClick={handleCreateAccount}
        >Continue</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );


  return (
    <div className={classes.root}>
      <Container maxWidth={false} disableGutters>
        {loading 
          ? (<span>{loadingMessage}</span>)
          : !account
            ? renderSignUp
            : renderLogin
        }
      </Container>
    </div>
  );
}

export default Login;