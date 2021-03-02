import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GameCard from '../../components/game-card/GameCard';

const StyledTabs = withStyles((theme) => ({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 50,
            width: '100%',
            backgroundColor: theme.palette.primary.dark,
        },
    },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: theme.palette.primary.contrastText,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(18),
        marginRight: theme.spacing(2),
        minWidth: '40px',
        '& > span': {
            width: 'auto',
        },
        '&:selected': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    //
  }, [dispatch]);


  return (
    <Container maxWidth="lg" className={classes.gameListContainer}>
        <Typography className={classes.listHeader} variant="h3" gutterBottom>
            Game Library
        </Typography>

        <Grid container justify="flex-start" spacing={6} className={classes.gameListGrid}>
            <Grid key={0} item>
                <GameCard 
                    image="http://localhost:3182/images/coinhunter.png"
                    title="Coin Hunter"
                    description="Demo showcasing blockchain gaming."
                />
            </Grid>
            <Grid key={1} item>
                <GameCard 
                    image="https://pbs.twimg.com/media/Dd4mWFYU0AADd2B?format=jpg&name=small"
                    title="GamePower 3D Demo"
                    description="This is 3D game made in Unity and showcases what a GamePower integrated game can do."
                />
            </Grid>

            <Grid key={2} item>
                <GameCard 
                    image="https://unity.com/sites/default/files/styles/810_scale_width/public/2020-01/unity-asset-store-sunny-land-by-ansimuz-810x456.jpg?itok=Qw-2YSaT"
                    title="GamePower 2D Demo"
                    description="This is 3D game made in Unity and showcases what a GamePower integrated game can do."
                />
            </Grid>

            <Grid key={3} item>
                <GameCard 
                    image="https://unity.com/sites/default/files/styles/810_scale_width/public/2020-01/unity-asset-store-sunny-land-by-ansimuz-810x456.jpg?itok=Qw-2YSaT"
                    title="GamePower 2D Demo"
                    description="This is 3D game made in Unity and showcases what a GamePower integrated game can do."
                />
            </Grid>

            <Grid key={4} item>
                <GameCard 
                    image="https://unity.com/sites/default/files/styles/810_scale_width/public/2020-01/unity-asset-store-sunny-land-by-ansimuz-810x456.jpg?itok=Qw-2YSaT"
                    title="GamePower 2D Demo"
                    description="This is 3D game made in Unity and showcases what a GamePower integrated game can do."
                />
            </Grid>
        </Grid>
    </Container>
  );
}

export default GameLibrary;