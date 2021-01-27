import React ,{useState,useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import commerce from '../commerceJs/commerceJs'
import useStyles from './AdressStyle'


const AdressForm = ({checkoutToken,saveShippingData}) => {

    //var formData = {}
    
    const handleInput = (e)=>(setFormData({...formData,[e.target.name]:e.target.value})) ;

    const [formData,setFormData] = useState({      
    firstname:'',
    lastname:'',
    address:'',
    email:'',
    city:'',
    zip:'',
    country:'',
    state:'',
    shippindOption:''})

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  
    const classes = useStyles();

    const fetchShippingCountries = async (checkoutTokenId) => {
      const  {countries}  = await commerce.services.localeListShippingCountries(checkoutTokenId);
      
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
      
    };

    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
  
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
      
    };
  
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
  
      setShippingOptions(options);
      setShippingOption(options[0].id);
    };

    useEffect(() => {
      fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
      if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);
  
    useEffect(() => {
      if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
        <div>
            <form onSubmit={()=>saveShippingData(formData)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <input name='firstname' placeholder='Your FirstName' required className={classes.input} onChange={(e)=>handleInput(e)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                <input name='lastname' placeholder='Your LastName' required className={classes.input} onChange={(e)=>handleInput(e)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                <input name='address' placeholder='Your Adresse' required className={classes.input} onChange={(e)=>handleInput(e)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                <input name='email' placeholder='Your Email' required className={classes.input} onChange={(e)=>handleInput(e)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                <input name='city' placeholder='Your City' required className={classes.input} onChange={(e)=>handleInput(e)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                <input name='zip' placeholder='Your ZipCode' required className={classes.input} onChange={(e)=>handleInput(e)}/> 
                </Grid> 

                <Grid item xs={12} sm={6} style={{width:'30%',marginLeft:'30px',marginTop:'15px'}}>
              <InputLabel>Shipping Country</InputLabel>
              <Select name='country'  fullWidth value={formData.country?formData.country:shippingCountry} onChange={(e)=>handleInput(e)}>
                 {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))} 
              </Select>
            </Grid>
                <Grid  item xs={12} sm={6} style={{width:'30%',marginLeft:'30px',marginTop:'15px'}}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select  name='state' fullWidth value={formData.state?formData.state:shippingSubdivision} onChange={(e)=>handleInput(e)}>
                 {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))} 
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} style={{width:'30%',marginLeft:'30px',marginTop:'15px'}}>
              <InputLabel>Shipping Options</InputLabel>
              <Select  name='shippingOption' fullWidth value={formData.shippingOption?formData.shippingOption:shippingOption} onChange={(e)=>handleInput(e)}>
                 {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))} 
              </Select>
            </Grid>   
            </Grid>
            <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' ,margin:'15px'}}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
            </form>
        </div>
    )
}

export default AdressForm
