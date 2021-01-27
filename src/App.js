import React,{useState,useEffect} from 'react'
import commerce from './commerceJs/commerceJs'
import './App.css';
import Navbar from './Navbar/Navbar'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Products from './Products/Products'
import Cart from './Cart/Cart'
import Checkout from './checkout/Checkout'


function App() {

  const [products,setProducts] = useState([]);
  const [cart,setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  const fetchProducts = async ()=>{
    const {data} =  await commerce.products.list();
    setProducts(data)
    }

  const fetchCart = async ()=>(
    setCart(await commerce.cart.retrieve())
  )

  const addToCart = async (productId,quantity)=>{
    const data = await commerce.cart.add(productId,quantity)
    setCart(data.cart);
    
  }

  const updateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const removeFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const emptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const captureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
useEffect(()=>{
fetchProducts();
fetchCart();
console.log(cart);
},[]);

  return (
    <div className="App">
      <Router>
      <Navbar itemsN={cart.total_items}/>
      <Switch>
      <Route path="/" exact>
      <Products products={products} addToCart={addToCart} />
      </Route>
      <Route path='/cart' exact>
      <Cart cart={cart} updateCartQty={updateCartQty} removeFromCart={removeFromCart} emptyCart={emptyCart}/>
      </Route> 
      <Route path='/checkout' exact>
        <Checkout cart={cart} order={order} onCaptureCheckout={captureCheckout} error={errorMessage}/>
      </Route>
      </Switch>


      </Router>

    </div>
  );
}

export default App;
