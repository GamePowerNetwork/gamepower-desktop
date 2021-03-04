import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      maxWidth: 272,
    },
  });

function ItemCard(props) {
    const classes = useStyles();

    // Once all loading is done, go to the login screen
    useEffect(() => {
        
    }, []);



    return (
        <Card elevation={18} raised={true} className={classes.root}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="272"
                image={props.image}
                />
            </CardActionArea>
            <CardContent>
                <Typography variant="subtitle1" color="secondary">
                    {props.title}
                </Typography>
                <Typography variant="subtitle2">
                    {props.creator}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary">Buy</Button>
            </CardActions>
        </Card>
    );
}

export default ItemCard;