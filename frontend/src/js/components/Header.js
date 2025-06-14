import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import 'styles/components/Header.css'
import { Link } from "react-router-dom";

function SwipeableTemporaryDrawer() {
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className="header-box"
        >
            <List>
                <Link to="/">
                    <ListItem button key={'Home'}>
                        <ListItemIcon>
                            <span className="material-icons">home</span>
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                </Link>
                <Link to="/my-polls">
                    <ListItem button key={'My pools'}>
                        <ListItemIcon>
                            <span className="material-icons">list</span>
                        </ListItemIcon>
                        <ListItemText primary={'My pools'} />
                    </ListItem>
                </Link>
                <Link to="/new-poll">
                    <ListItem button key={'New pool'}>
                        <ListItemIcon>
                            <span className="material-icons">add</span>
                        </ListItemIcon>
                        <ListItemText primary={'New pool'} />
                    </ListItem>
                </Link>
                <Link to="/search-polls">
                    <ListItem button key={'Search pools'}>
                        <ListItemIcon>
                            <span className="material-icons">search</span>
                        </ListItemIcon>
                        <ListItemText primary={'Search pools'} />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to="/settings">
                    <ListItem button key={'Settings'}>
                        <ListItemIcon>
                            <span className="material-icons">settings</span>
                        </ListItemIcon>
                        <ListItemText primary={'Settings'} />
                    </ListItem>
                </Link>
                <Link to="/">
                    <ListItem button key={'Logout'}>
                        <ListItemIcon>
                            <span className="material-icons">logout</span>
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <Button onClick={toggleDrawer('left', true)}>
                    <span className="material-icons">menu</span>
                </Button>
                <SwipeableDrawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

const Header = () => {
    return (
        <div className="header-background">
            <SwipeableTemporaryDrawer/>
            <div className="header-title">Bet App</div>
        </div>
    )
}

export default Header;