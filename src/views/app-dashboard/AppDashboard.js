import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
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
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import Popover from '@material-ui/core/Popover';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ProfileCard from '../../components/profile-card/ProfileCard';
import GameLibrary from '../game-library/GameLibrary';
import Collectables from '../collectables/Collectables';
import Market from '../market/Market';
import Community from '../community/Community';

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
      zIndex: theme.zIndex.drawer + 1,
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
    let { path, url } = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    const activeAccount = useSelector(getActiveAccount);

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        if(activeAccount) {
        } else {
          history.push("/login");
        }
    }, [activeAccount]);

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = (event) => {
      setAnchorEl(null);
    };

    const handleMoreMenuOpen = (event) => {
      setMoreAnchorEl(event.currentTarget);
    }
  
    const handleMoreMenuClose = () => {
      setMoreAnchorEl(null);
    };
  
    const handleSectionChange = (section) => {
      history.push(section);
    };
    
    const menuId = 'primary-search-account-menu';


    const renderPopover = (
      <Popover
          id={menuId}
          open={isMenuOpen}
          anchorEl={anchorEl}
          onClose={handleProfileMenuClose}
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

    const renderMoreMenu = (
      <Menu
        id="more-menu"
        anchorEl={moreAnchorEl}
        keepMounted
        open={Boolean(moreAnchorEl)}
        onClose={handleMoreMenuClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleMoreMenuClose}>Mods</MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>Token Swap</MenuItem>
        <MenuItem onClick={handleMoreMenuClose}>Help</MenuItem>
      </Menu>
    );
    



    return (
      <React.Fragment>
            <AppBar className={classes.appBar} position="sticky">
                <Toolbar>
                <Button className={classes.title} onClick={() => handleSectionChange(`${url}`)} disableRipple disableFocusRipple>
                  <Typography variant="h6" noWrap>
                    Games
                  </Typography>
                </Button>
                <Button className={classes.title} onClick={() => handleSectionChange(`${url}/collectables`)} disableRipple disableFocusRipple>
                  <Typography variant="h6" noWrap>
                    Inventory
                  </Typography>
                </Button>
                <Button className={classes.title} onClick={() => handleSectionChange(`${url}/market`)} disableRipple disableFocusRipple>
                  <Typography variant="h6" noWrap>
                    Market
                  </Typography>
                </Button>
                <Button className={classes.title} onClick={() => handleSectionChange(`${url}/community`)} disableRipple disableFocusRipple>
                  <Typography variant="h6" noWrap>
                    Community
                  </Typography>
                </Button>
                <IconButton
                    edge="start"
                    onClick={handleMoreMenuOpen}
                    className={classes.menuButton}
                    color="inherit"
                >
                    <MoreVertIcon />
                </IconButton>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search GamePower"
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
            {renderMoreMenu}
            
            <Container maxWidth={false} className={classes.scrollableContainer}>
              <Router>
                <Switch>
                  <Route path={`${path}`} exact component={GameLibrary}/>
                  <Route path={`${path}/collectables`} component={Collectables}/>
                  <Route path={`${path}/market`} component={Market}/>
                  <Route path={`${path}/community`} component={Community}/>
                </Switch>
              </Router>
            </Container>
            
      </React.Fragment>
    );
}

export default AppDashboard;
