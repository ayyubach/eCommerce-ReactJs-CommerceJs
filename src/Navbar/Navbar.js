import React from 'react'
import {AppBar,Toolbar,Typography,IconButton,Badge} from '@material-ui/core'
import {Home} from '@material-ui/icons'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom'

import useStyles from './styles'

const Navbar = ({itemsN}) => {
    const classes = useStyles();
    return (
<div>
    <AppBar>
        <Toolbar className={classes.toolBar}>
         <Typography style={{textDecoration:'none',color:'#ffffff'}}component={Link} to="/"><Home />YStore</Typography>
         <IconButton component={Link} to="/cart" className={classes.toolBarRight}>
             <Badge badgeContent={itemsN} color="secondary">
         <ShoppingCartIcon />
            </Badge  >   
          </IconButton >    
        </Toolbar>
    </AppBar>
</div>
    )
}

export default Navbar
