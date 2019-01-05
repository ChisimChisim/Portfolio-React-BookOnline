import React from 'react';
import PropTypes from 'prop-types';
import {CardElement, injectStripe} from 'react-stripe-elements';
import {Button} from '@material-ui/core';
import qs from 'qs';
import '../App.css'; 
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';

//Style
const styles = theme => ({
    btn_center:{
        textAlign : 'center', 
        marginTop: '30px',
    },

    wrapper: {
      margin: theme.spacing.unit,
      position: 'relative',
    },
  
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
});


class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,  //Payment progress icon
    }
    this.submit = this.submit.bind(this);
    
  }

   // User clicked submit
  async submit(ev) {
    ev.preventDefault();
   
    //Start payment progress icon
    this.setState(
      {
        loading: true,
      },
    );
    
    //Request charge to Server (Server=>Stripe API)
    try{
      //Get Stripe Token
      let {token} = await this.props.stripe.createToken({name: this.props.username});
      const cookies = new Cookies();
      //Get jwt Token form cookie
      const jwtToken = cookies.get('jwtToken');
      let response = await fetch("http://localhost:8080/api/payment/charge", {
        method: 'POST',
        headers:  {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": jwtToken,
        },   
      body: qs.stringify({"token":token.id, "amount":this.props.amount}),
    });
    
    //If succsess, empty cart and display succress message
    if(response.status===200){
     response.json().then(data=>{
         this.props.emptyCart();
         this.props.openSnackbar(true, 'success', 'Successful payment for $' + ((data.amount/100).toFixed(2)) + ' (Payment ID is ' + data.chargeId + ')');
         });
    }else if(response.status===401 || response.status===403){
         this.props.openSnackbar(true, 'error', "Unauthorized. Please re-login with your account.");
     }
   }catch(err){
         this.props.openSnackbar(true, 'error', "Please input your correct payment info.");
  }

  //Stop payment progress icon
  this.setState(
    {
      loading: false,
    },
  );
  }


  render() {
    const {classes} = this.props;
    return (
      <div className="main-container checkout">    
      <form>
        <p>Would you like to complete the purchase?</p>
        <CardElement hidePostalCode={true} style={{base:{fontSize: '14px'}, invalid: {color: 'red'}}}/>
        <div className={classNames(classes.btn_center, classes.wrapper)}>
        {this.props.amount===0 &&
                <Button variant="contained" color="secondary"  disabled={true} onClick={this.submit}>
                   {`Pay $${((this.props.amount)/100).toFixed(2)}`}
                </Button>
        }    
        {this.props.amount!==0 &&
                <Button variant="contained" color="secondary" disabled={this.state.loading} onClick={this.submit}>
                   {`Pay $${((this.props.amount)/100).toFixed(2)}`}
                </Button>
        }   
        {
          /* Payment progress icon*/
          }
        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  classes: PropTypes.object.isRequired,
  
};


export default withStyles(styles)(injectStripe(CheckoutForm));
