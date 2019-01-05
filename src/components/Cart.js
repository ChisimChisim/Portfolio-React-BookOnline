import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Card, Typography, CardContent, Divider} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import CheckoutForm from '../containers/CheckoutForm';

//Set TAX
const TAX = 7;   //tax(%)

//STYLE
const styles = theme => ({
    btn_center:{
        textAlign : 'center', 
        marginTop: '10px',
    }
});


class Cart extends React.Component{

    constructor(props) {
        super(props);
        this.get_subtotal = this.get_subtotal.bind(this);
        this.get_tax = this.get_tax.bind(this);
        this.get_total = this.get_total.bind(this);
      }  

    //Get subtotal
    get_subtotal(cart){
        var subtotal = 0;
        for(var i=0; i<cart.length; i++){
           subtotal = subtotal + cart[i].price;
        }
        return subtotal;  //cents
    }
    //Get Tax
    get_tax(subtotal){
        return Math.floor(subtotal * TAX / 100);  //cents
    }
    //Get total price
    get_total(subtotal, tax){
        return Math.floor(subtotal + tax); //cents

    }

    render(){
        const cart = this.props.cart;
        const subtotal = this.get_subtotal(cart);
        const tax_total = this.get_tax(subtotal);
        const total = this.get_total(subtotal, tax_total); 

        return(
           <div >
               <Card>
                   <CardContent>
                   <Typography  variant="h6" align="center">
                      Selected Items  
                      <Badge badgeContent={cart.length} color="secondary">   
                      <ShoppingCartIcon />
                      </Badge>
                   </Typography> 
           
           {(() => {
            if(typeof cart !== 'undefined'){
             return( 
         
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell padding='none' colSpan={2}>Book Title</TableCell>
                    <TableCell numeric padding='none'>price($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
               {cart.map((item,key) => (
               <TableRow key={key}>    
               <TableCell padding='none' colSpan={2}>
                  {`${key+1}. ${item.title}`}
                </TableCell> 
                <TableCell numeric padding='none'>
                    {`${(item.price/100).toFixed(2)}`}
                </TableCell>
                </TableRow> 
               ))}
        
               <TableRow>
                   <TableCell></TableCell>
                   <TableCell padding='none'>
                   <Typography variant="subtitle2">Subtotal</Typography>
                   </TableCell>
                   <TableCell padding='none' numeric>{(subtotal/100).toFixed(2)}</TableCell>
               </TableRow>
               <TableRow>
                   <TableCell></TableCell>
                   <TableCell padding='none'>
                   <Typography variant="subtitle2">{`Tax(${TAX}%)`}</Typography>
                   </TableCell>
                   <TableCell padding='none' numeric>{(tax_total/100).toFixed(2)}</TableCell>
               </TableRow>
               <TableRow>
                   <TableCell></TableCell>
                   <TableCell padding='none'>
                   <Typography variant="subtitle2">Total</Typography></TableCell>
                   <TableCell padding='none' numeric>
                   <Typography variant="subtitle2">{`$${(total/100).toFixed(2)}`}</Typography>
                   </TableCell>
               </TableRow>
               </TableBody>
            </Table>  
        
             )}})()}
             <Divider />   
  {/**
  * CheckoutForm is to pay via Stripe payment API
  */}
            <CheckoutForm amount={total} username={this.props.username}/>

             </CardContent>
             </Card>
           </div>
    
        );
    }

}

Cart.propTypes = {
    classes: PropTypes.object.isRequired,
    cart: PropTypes.array,
    username: PropTypes.string,
  };
  

export default withStyles(styles)(Cart);