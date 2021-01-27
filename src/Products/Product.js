import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles2'


const Product = ({product,addToCart}) => {
console.log(product)
    const classes = useStyles();

    return (
        <div>

            <Card>
                <CardMedia image={product.media.source} className={classes.cardMedia} />
                <CardContent >
                    <div className={classes.name}>
                    <Typography>{product.name}</Typography>
                    <Typography style={{marginLeft:'auto'}}>{product.price.formatted_with_symbol}</Typography>        
                    </div>

                    <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
     
                </CardContent>
                <CardActions disableSpacing>
                   <IconButton   aria-label="Add to Cart" onClick={()=>addToCart(product.id,1)}>
                   <AddShoppingCart className={classes.cardAction}/>
                  </IconButton>
                  </CardActions>
            </Card>
           
        </div>
    )
}

export default Product
