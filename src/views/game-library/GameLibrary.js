import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import GameCard from '../../components/game-card/GameCard';

const useStyles = makeStyles({
    root: {
      maxWidth: 300,
    },
    gameListContainer: {
        marginTop: '55px',
        marginBottom: 65,
    },
    gameListGrid: {
        paddingTop: '30px',
    },
    listHeader: {
        fontWeight: 'bold',
    },
  });


function GameLibrary() {
  const dispatch = useDispatch();
  const classes = useStyles();


  useEffect(() => {
    //
  }, [dispatch]);


  return (
    <Container maxWidth="lg" className={classes.gameListContainer}>
        <Typography className={classes.listHeader} variant="h3">
            Game Library
        </Typography>

        <Typography className={classes.listHeader} variant="h5" gutterBottom>
            5 Games
        </Typography>

        <Grid container justify="flex-start" spacing={6} className={classes.gameListGrid}>
            <Grid key={0} item>
                <GameCard 
                    image="http://localhost:3182/images/coinhunter.png"
                    title="Coin Hunter"
                    enabled={true}
                />
            </Grid>
            <Grid key={1} item>
                <GameCard 
                    image="http://localhost:3182/images/fez.jpg"
                    title="FEZ"
                />
            </Grid>

            <Grid key={2} item>
                <GameCard 
                    image="http://localhost:3182/images/neversong.jpg"
                    title="Neversong"
                />
            </Grid>

            <Grid key={3} item>
                <GameCard 
                    image="http://localhost:3182/images/cars.png"
                    title="Project Cars"
                />
            </Grid>

            <Grid key={4} item>
                <GameCard 
                    image="http://localhost:3182/images/quest.jpg"
                    title="Costume Quest"
                />
            </Grid>
        </Grid>
    </Container>
  );
}

export default GameLibrary;