import React from 'react'
import Grid from '@material-ui/core/Grid';
import Product from './Product'

import useStyles from './styles'



const Products = ({products,addToCart}) => {

    const classes = useStyles();
    return (
        <div className={classes.content}>
        <Grid container justify="center" spacing={4}>
        {products.map((product)=>(
        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
        <Product product={product} addToCart={addToCart}/>
        </Grid>
         ))}  
            </Grid>


        </div>
    )
}

export default Products
