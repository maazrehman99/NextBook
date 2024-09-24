import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './CustomTextField';

const mockShippingCountries = {
  US: 'United States',
  CA: 'Canada',
  GB: 'United Kingdom',
};

const mockShippingSubdivisions = {
  CA: 'California',
  NY: 'New York',
  TX: 'Texas',
};

const mockShippingOptions = [
  { id: 'standard', description: 'Standard Shipping', price: { formatted_with_symbol: '$5.00' } },
  { id: 'express', description: 'Express Shipping', price: { formatted_with_symbol: '$15.00' } },
];

const AddressForm = ({ checkoutToken, test }) => {
  const [shippingCountries, setShippingCountries] = useState(mockShippingCountries);
  const [shippingCountry, setShippingCountry] = useState('US');
  const [shippingSubdivisions, setShippingSubdivisions] = useState(mockShippingSubdivisions);
  const [shippingSubdivision, setShippingSubdivision] = useState('CA');
  const [shippingOptions, setShippingOptions] = useState(mockShippingOptions);
  const [shippingOption, setShippingOption] = useState('standard');
  const methods = useForm();

  useEffect(() => {
    // Set the default country and subdivision on mount
    setShippingCountry(Object.keys(shippingCountries)[0]);
    setShippingSubdivision(Object.keys(shippingSubdivisions)[0]);
    setShippingOption(shippingOptions[0].id);
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {Object.entries(shippingCountries).map(([code, name]) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => (
                  <MenuItem key={sO.id} value={sO.id}>
                    {`${sO.description} - (${sO.price.formatted_with_symbol})`}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
