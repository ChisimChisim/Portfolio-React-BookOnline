import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Book from '../containers/Book';
import Navi from '../containers/Navi';
import BookList from '../containers/BookList';
import '../App.css';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Cart from '../containers/Cart';

const apikey = 'pk_test_XXXXXXXXXXXXXXXXXXX';  //your Stripe public Key

class Main extends Component {

  render() {
    return (
      <div className='App'>
{
  /** NAVI
   * 
   */
}     <StripeProvider apiKey={apikey}>
         <Elements><Navi /></Elements>
      </StripeProvider>

      <div className='main-container'>
{
  /** Change diplaies by route path
   *  1. Book list
   *  2. Book description & review
   */
}      
      <div className="maincol">
        {/* Setting Route */}
        <Switch>
        <Route exact path="/kcbooks" render={()=><BookList genruId={'0'}/>} />
        <Route exact path="/kcbooks/genru/all"  render={()=><BookList genruId={'0'}/>} />
        <Route 
           path="/kcbooks/genru/:id"
          render={
            ({match}) => <BookList genruId={match.params.id} />
          }
          />
        <Route 
          exact path="/kcbooks/book/:id" 
          render={
            ({match}) => <Book bookId={match.params.id} />
        }
        />
        </Switch>
      </div>

{
  /**
   * Stripe API 
   * Give the api public Key to provide
   */
}

      <div className='sidebar'>
     
        <StripeProvider apiKey={apikey}>
               <Elements><Cart /></Elements>
        </StripeProvider>
      </div>

      </div>
      </div>
    );
  }
}

export default Main;