import { Typography,Button } from '@material-ui/core';
import React from 'react'
import useStyles from './styles'
import {Link} from 'react-router-dom'
import CartItem from './CartItem'
import Grid from '@material-ui/core/Grid';

const Cart = ({cart,updateCartQty,removeFromCart,emptyCart}) => {
     //console.log(cart.line_items)
    const classes = useStyles();
    if (!cart.line_items) return <Typography className={classes.content}></Typography>;
    const RenderEmptyCard = () =>(
        <Typography variant="subtitle1" style={{textAlign:'center'}}>You have no items in your shopping cart,
            <Link to='/' className={classes.link}>start adding some</Link>
        </Typography>
    )

    const RenderCart = ()=>(
        <div >
        <Grid container spacing={3}>
            {cart.line_items.map((item)=>(
                 <Grid item xs={12} sm={4} key={cart.line_items.id}>
                <CartItem key={item.id} item={item} updateCartQty={updateCartQty} removeFromCart={removeFromCart}/>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
        <Typography variant="h6" >Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
        <Button size="large" type="button" variant="contained" color="secondary" onClick={()=>(emptyCart())}>Empty cart</Button>
        <Button style={{marginLeft:'6px'}} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
        </div>
        </div>
    )
    
    return (
        <div className={classes.content}>
            <Typography style={{marginBottom:'15px',textAlign:'center'}}>Your Shipping Cart </Typography>
            { !cart.line_items.length ? RenderEmptyCard() : RenderCart() }
        </div>
    )
}

export default Cart
