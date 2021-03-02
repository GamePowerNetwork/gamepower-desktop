import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLoading } from '../../application/selectors/ui';

import Identicon from '@polkadot/react-identicon';

import { CustomThemeContext } from '../../themes/CustomThemeProvider'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
    const history = useHistory();
    const loading = useSelector(getLoading);
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
                    {props.account.meta.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Balance: {accountBalance.balance.free.toString()}
                </Typography>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem button>
                        <ListItemText primary="Friends" />
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                        <ListItemText primary="Subscriptions" />
                    </ListItem>
                    <Divider light />
                    <ListItem button>
                        <ListItemText primary="Wallet" />
                    </ListItem>
                    <Divider light />
                    <ListItem button>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <Divider light />
                    <ListItem button>
                        <ListItemText primary="Logout" />
                    </ListItem>
                    <Divider light />
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