import React from 'react';


// Material
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    grow: {
      marginLeft: '14px',
    },
    appRegion: {
      flexGrow: 1,
      '-webkit-app-region': 'drag',
      height: '100%'
    },
    appBar: {
        height: '40px',
    },
    iconBtn: {
      marginTop: '5px',
    },
    toolBar: {
      minHeight: '30px',
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
}));

function WindowBar() {
    const classes = useStyles();

    function closeWindow() {
        const remote = (window.require) ? window.require("electron").remote : null;
        const WIN = remote.getCurrentWindow();
        WIN.close();
      }
    
      function fullscreenWindow() {
        const remote = (window.require) ? window.require("electron").remote : null;
        const WIN = remote.getCurrentWindow();
    
        if(WIN.isMaximized()) {
          WIN.unmaximize();
        } else {
          WIN.maximize(true);
        }
      }
    
      function minimizeWindow() {
        const remote = (window.require) ? window.require("electron").remote : null;
        const WIN = remote.getCurrentWindow();
        WIN.minimize();
      }


    return (
        <React.Fragment>
            <AppBar color="inherit" position="sticky" className={classes.appBar}>
                <Toolbar variant="dense" className={classes.toolBar}>
                <div className={classes.appRegion} />
                <IconButton
                    edge="start"
                    color="inherit"
                    size="small"
                    className={classes.iconBtn}
                    onClick={() => minimizeWindow()}
                    >
                    <MinimizeIcon fontSize="default" />
                </IconButton>
                <div className={classes.grow} />
                <IconButton
                    edge="end"
                    color="inherit"
                    size="small"
                    className={classes.iconBtn}
                    onClick={() => fullscreenWindow()}
                    >
                    <FullscreenIcon fontSize="default" />
                </IconButton>
                <div className={classes.grow} />
                <IconButton
                    edge="end"
                    color="inherit"
                    size="small"
                    className={classes.iconBtn}
                    onClick={() => closeWindow()}
                    >
                    <CloseIcon fontSize="default" />
                </IconButton>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default WindowBar;