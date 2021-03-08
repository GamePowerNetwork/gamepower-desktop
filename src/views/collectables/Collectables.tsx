import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SportsEsportsTwoToneIcon from '@material-ui/icons/SportsEsportsTwoTone';
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone';

import ItemCard from '../../components/item-card/ItemCard';
import { IInventoryItem } from '../../infrastructure/interfaces/IInventoryItem';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 300,
    },
    collectablesContainer: {
        marginTop: '55px',
        marginBottom: 65,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
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
        textTransform: "uppercase"
    },
    largeIcon: {
        fontSize: 200,
        opacity: 0.2
    }
  }));


function Collectables() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [inventory, setInventory] = useState<IInventoryItem[]>([]);

  useEffect(() => {
    setInventory(items);
  }, [dispatch]);


  const items = [
    {
        title: 'Obsidian Kataclysm',
        creator: 'Lost Relics',
        image: 'sword',
        price: 20,
    },
    {
        title: 'Golden Evanbrook egg',
        creator: 'Lost Relics',
        image: 'egg',
        price: 2,
    },
    {
        title: 'Atari Dress',
        creator: 'Atari',
        image: 'dress',
        price: 30,
    },
    {
        title: 'Arena Ticket',
        creator: '9Lives Arena',
        image: 'arena',
        price: 1,
    },
    {
        title: 'Golden Evanbrook egg',
        creator: 'Lost Relics',
        image: 'egg',
        price: 2,
    }
];


  return (
    <Container maxWidth="lg" className={classes.collectablesContainer}>
        <Typography className={classes.listHeader} variant="h3">
            Inventory
        </Typography>

        <Typography className={classes.listHeader} variant="h5" gutterBottom>
            {inventory?.length} Items
        </Typography>

        <Box display="flex" flexDirection="row-reverse" alignContent="stretch" justifyContent="space-between" pt={4}>
            <Box position="sticky" width="20%">
                <Paper className={classes.sideBar}>
                    <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemIcon>
                            <SportsEsportsTwoToneIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="GamePower Items" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <CategoryTwoToneIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Custom Items" />
                    </ListItem>
                </List>
                <Divider />
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="Weapons" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Equipment" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Skins" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Characters" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Trading Cards" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Art" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Virtual Land" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Other" />
                    </ListItem>
                </List>
                </Paper>
            </Box>

            <Box width="80%">

                {inventory?.length > 0 ?
                <Grid container justify="flex-start" spacing={5}>
                    {inventory?.map((inventoryItem:any, key:Number) => {
                        return(
                            <Grid item>
                                <ItemCard 
                                    image={`http://localhost:3182/images/${inventoryItem.image}.png`}
                                    title={inventoryItem.title}
                                    creator={inventoryItem.creator}
                                />
                            </Grid>
                        )
                    })}
                </Grid>

                :

                <Paper elevation={0} className={classes.noItemsContainer}>
                    <SportsEsportsTwoToneIcon color="secondary" className={classes.largeIcon} />

                    <Typography variant="h4" component="h2">
                        No Items in your inventory
                    </Typography>

                    <Typography variant="subtitle1" component="h2">
                        Play games to earn items!
                    </Typography>
                </Paper>
                }
            </Box>
        </Box>
        
    </Container>
  );
}

export default Collectables;