import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 300,
    },
    collectablesContainer: {
        marginTop: '55px',
        marginBottom: 65,
    },
    collectablesBox: {
        paddingTop: '30px',
    },
    listHeader: {
        fontWeight: 'bold',
    },
    sideBar: {
        position: '-webkit-sticky',
        top: 45,
        bottom: 20, 
    },
    gridItem: {
        minHeight: 200,
        minWidth: 270
    },
    noItemsContainer: {
        display: "flex",
        marginRight: 15,
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        color: theme.palette.secondary.main,
        textTransform: "uppercase",
        minHeight: 500,
    },
    largeIcon: {
        fontSize: 200,
        opacity: 0.2
    }
  }));


function Community() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    
  }, [dispatch]);


  return (
    <Container maxWidth="lg" className={classes.collectablesContainer}>
        <Typography className={classes.listHeader} variant="h3">
            Community
        </Typography>

        <Typography className={classes.listHeader} variant="h5" gutterBottom>
            Coming soon
        </Typography>

        <Box display="flex" flexDirection="row-reverse" alignContent="stretch" justifyContent="space-between" pt={4}>
            <Box width="100%">
                <Paper elevation={0} className={classes.noItemsContainer}>
                    <ForumTwoToneIcon color="secondary" className={classes.largeIcon} />

                    <Typography variant="h4" component="h2">
                    Coming soon!
                    </Typography>

                    <Typography variant="subtitle1" component="h2">
                        Friends, Guilds and Governance!
                    </Typography>
                </Paper>
            </Box>
        </Box>
        
    </Container>
  );
}

export default Community;