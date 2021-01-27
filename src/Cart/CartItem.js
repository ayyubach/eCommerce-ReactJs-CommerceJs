import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import useStyles from './styles2'

const CartItem = ({item,updateCartQty,removeFromCart}) => {

    console.log(item)

    const classes = useStyles();

    return (
        <div>
            <Card>
                <CardMedia image={item.media.source} className={classes.cardMedia}/>
                <CardContent>
                <div className={classes.name}>
                    <Typography>{item.name}</Typography>
                    <Typography style={{marginLeft:'auto'}}>{item.price.formatted_with_symbol}</Typography>        
                </div>
                </CardContent>
                <CardActions>
                    <div className={classes.buttons}>
                        <Button type="button" size="small" onClick={()=>updateCartQty(item.id,item.quantity-1)}>-</Button>
                        <Typography>{item.quantity}</Typography>
                        <Button type="button" size="small" onClick={()=>updateCartQty(item.id,item.quantity+1)}>+</Button>
                    </div>
                    <Button variant="contained" type="button" color="secondary" style={{marginLeft:'auto'}}
                    onClick={()=>removeFromCart(item.id)}>Remove</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default CartItem
