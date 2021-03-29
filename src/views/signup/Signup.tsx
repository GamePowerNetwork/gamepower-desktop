import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, makeStyles } from '@material-ui/core';

import { getPhrase } from '../../application/selectors/keyring';
import { 
  generatePhrase, 
  addAccount, 
} from '../../application/actions/keyring';

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

export default function Signup() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const phrase = useSelector(getPhrase);
    const [step, setStep] = useState(0);
    const [nameValue, setNameValue] = useState("");
    const [passwordValues, setPasswordValues] = useState({
        password: "",
        passwordConfirm: "",
        errorText: "",
        passwordsMatch: false
    });

    useEffect(() => {
        if(passwordValues.password === passwordValues.passwordConfirm && passwordValues.password.length > 5) {
            setPasswordValues({...passwordValues, passwordsMatch: true, errorText: ""});
        } else {
            setPasswordValues({...passwordValues, passwordsMatch: false, errorText: "Passwords do not match"});
        }
    }, [passwordValues.password, passwordValues.passwordConfirm]);

    useEffect(() => {
        if(phrase) {
          nextStep();
        }
    }, [phrase]);


    const nextStep = () => {
        setStep(step + 1)
    }

    const previousStep = () => {
        setStep(step - 1)
    }

    const handleSavePassword = () => {
        dispatch(generatePhrase);
    }

    const handleCreateAccount = () => {
        dispatch(addAccount(phrase, passwordValues.password, nameValue))

        setPasswordValues({...passwordValues, password:"", passwordConfirm:""});
        setNameValue("");
    }

    const renderSignUp = (
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
                onClick={nextStep}
                >Create New Account</Button>
            </Typography>
        </CardContent>
        </Card>
    );

    const renderPassword = (
        <Card className={classes.card}>
            <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                    Create a password
                </Typography>
            </CardContent>
            <CardContent>
                <Typography align="center" gutterBottom variant="subtitle1" component="h2">
                    Your personal information never leaves your device, and this password helps keep it safe.
                </Typography>
                <TextField
                    autoFocus
                    margin="normal"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    color="secondary"
                    variant="filled"
                    value={passwordValues.password}
                    onChange={(e) => setPasswordValues({...passwordValues, password: e.target.value})}
                />

                <TextField
                    margin="normal"
                    id="password-confirm"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    color="secondary"
                    variant="filled"
                    value={passwordValues.passwordConfirm}
                    error={!passwordValues.passwordsMatch}
                    helperText={passwordValues.errorText}
                    onChange={(e) => setPasswordValues({...passwordValues, passwordConfirm: e.target.value})}
                />
            </CardContent>
            <CardActions>
                <Button onClick={previousStep} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSavePassword} color="secondary" disabled={!passwordValues.passwordsMatch}>
                    Continue
                </Button>
            </CardActions>
      </Card>
    )

    const renderPhrase = (
        <Card className={classes.card}>
            
            <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                    These are your secret words.
                </Typography>

                <Typography align="center" gutterBottom variant="subtitle1" component="h2">
                Your secret words will be able to re-generate your secure keys. If you lose your keys you will not be able to access your accounts.
                </Typography>

                <Typography align="center" className={classes.phrase}>
                    {phrase}
                </Typography>

            <Button 
                    className={classes.btn} 
                    variant="contained" 
                    size="large" 
                    color="primary"
                    onClick={nextStep}
                >I HAVE SAVED MY 12 WORD PHASE</Button>
    
            </CardContent>
        </Card>
    )

    const renderCreateName = (
        <Card className={classes.card}>
            
            <CardContent>
                <Typography align="center" gutterBottom variant="h5" component="h2">
                    Enter a username
                </Typography>

                <Typography align="center" gutterBottom variant="subtitle1" component="h2">
                    What would you like to be called?
                </Typography>
                <TextField
                    autoFocus
                    margin="normal"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    color="secondary"
                    variant="filled"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                />

            </CardContent>
            <CardActions>
                <Button 
                    className={classes.btn} 
                    variant="contained" 
                    size="large" 
                    color="primary"
                    onClick={handleCreateAccount}
                    >Continue</Button>
            </CardActions>
        </Card>
    )

    return (
        <React.Fragment>
            { (step === 0) && renderSignUp }
            { (step === 1) && renderPassword }
            { (step === 2) && renderPhrase }
            { (step === 3) && renderCreateName }
        </React.Fragment>
    )
}
