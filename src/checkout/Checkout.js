import React,{useEffect,useState} from 'react'
import useStyles from './styles'
import commerce from '../commerceJs/commerceJs'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography,
     CircularProgress, Divider, Button } from '@material-ui/core';
import AdressForm from './AdressForm'
import Payment from './Payment'
import {Link} from 'react-router-dom'

const Checkout = ({cart,order,error,onCaptureCheckout}) => {

    const classes = useStyles();
    const steps = ['Shipping address', 'Payment details'];
    
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const saveShippingData = (data) => {
      setShippingData(data);
  
      nextStep();
    };

    const Form = () =>(
      activeStep===0?<AdressForm checkoutToken={checkoutToken} saveShippingData={saveShippingData}/>
      :(<Payment checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} 
        onCaptureCheckout={onCaptureCheckout}/>)
    )

    let Confirmation = () => (order.customer ? (
      <>
        <div>
          <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    ));
    if (error) {
      Confirmation = () => (
        <>
          <Typography variant="h5">Error: {error}</Typography>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      );
    }
    useEffect(()=>{
        if (cart.id) {
            const generateToken = async () => {
              try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
      
                setCheckoutToken(token);
              } catch {
                //if (activeStep !== steps.length) history.push('/');
              }
            };
      
            generateToken();
          }
    },[cart]);

    return (
        <div className={classes.content}>
            <Paper>
                <Stepper activeStep={activeStep}>
                    {steps.map((step)=>(
                        <Step key={step}><StepLabel>{step}</StepLabel></Step>
                    ))}
                </Stepper>
                {activeStep===steps.length ?(<Confirmation />) : (checkoutToken&&<Form />)}
            </Paper>
        </div>
    )
}

export default Checkout
