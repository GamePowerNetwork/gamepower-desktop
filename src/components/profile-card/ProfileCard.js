import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Identicon from '@polkadot/react-identicon';

import { CustomThemeContext } from '../../themes/CustomThemeProvider'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { getAccountBalance } from '../../application/selectors/keyring';

const useStyles = makeStyles({
    root: {
      maxWidth: 370,
      minWidth: 190,
    },
    gameListContainer: {
        marginTop: '30px',
    },
    grow: {
        flexGrow: 1,
    },
    avatarContainer: {
        flexGrow: 1,
        textAlign: 'center',
        padding: '20px',
      }
  });

function ProfileCard(props) {
    const accountBalance = useSelector(getAccountBalance);
    const classes = useStyles();
    const { currentTheme, setTheme } = useContext(CustomThemeContext)
    const isDark = Boolean(currentTheme === 'dark')

    const handleThemeChange = (event) => {
        const { checked } = event.target
        if (checked) {
        setTheme('dark')
        } else {
        setTheme('light')
        }
    }

    return (
        <Card raised={true} className={classes.root}>
            <CardActionArea>
                <Container fixed className={classes.avatarContainer}>
                    <Identicon theme="polkadot" value={props.account?.address} size="142" />
                </Container>
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.account?.meta.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {accountBalance?.formattedBalance}
                </Typography>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem button divider>
                        <ListItemText primary="Wallet" />
                    </ListItem>
                    <ListItem button divider>
                        <ListItemText primary="Friends" />
                    </ListItem>
                    <ListItem button divider>
                        <ListItemText primary="Subscriptions" />
                    </ListItem>
                    <ListItem button divider>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Logout" />
                    </ListItem>
                    <ListItem >
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={isDark} onChange={handleThemeChange}/>}
                                label="Dark Mode"
                            />
                        </FormGroup>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}

export default ProfileCard;