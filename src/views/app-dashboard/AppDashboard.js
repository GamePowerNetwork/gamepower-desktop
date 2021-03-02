import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getActiveAccount } from '../../application/selectors/keyring';

import Identicon from '@polkadot/react-identicon';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Popover from '@material-ui/core/Popover';

import ProfileCard from '../../components/profile-card/ProfileCard';
import GameList from '../game-library/GameLibrary';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    scrollableContainer: {
      inset: '35px 0 0',
      position: 'absolute',
      overflow: 'auto',
    },
    appBar: {
        '-webkit-app-region': 'drag'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      textTransform: 'none',
      marginRight: 15,
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.palette.secondary.dark,
      },
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
      },
  }));


function AppDashboard() {
    const dispatch = useDispatch();
    const activeAccount = useSelector(getActiveAccount);

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {
        if(activeAccount) {
            console.log(activeAccount.accountInfo);
        }
    }, [activeAccount]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
    
      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };
    
      const menuId = 'primary-search-account-menu';


      const renderPopover = (
        <Popover
            id={menuId}
            open={isMenuOpen}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <ProfileCard account={activeAccount} discription="My profile" />
        </Popover>
      );
    
      const mobileMenuId = 'primary-search-account-menu-mobile';
    



    return (
      <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <Button className={classes.title} disableRipple disableFocusRipple>
                  <Typography variant="h6" noWrap>
                    Games
                  </Typography>
                </Button>
                <Button className={classes.title} disableRipple disableFocusRipple>
                  <Typography variant="h6" noWrap>
                    Collectables
                  </Typography>
                </Button>
                <Button className={classes.title} disableRipple disableFocusRipple>
                  <Typography variant="h6" noWrap>
                    Market
                  </Typography>
                </Button>
                <Button className={classes.title} disableRipple disableFocusRipple>
                  <Typography variant="h6" noWrap>
                    Community
                  </Typography>
                </Button>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search Games…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className={classes.grow} />
                <div>
                    <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    >
                        <Avatar className={classes.small}>
                            <Identicon theme="polkadot" value={activeAccount?.address} size="42" />
                        </Avatar>
                    </IconButton>
                </div>
                </Toolbar>
            </AppBar>
            {renderPopover}
            
            <Container maxWidth={false} className={classes.scrollableContainer}>
              <GameList />
            </Container>
            
      </React.Fragment>
    );
}

export default AppDashboard;
