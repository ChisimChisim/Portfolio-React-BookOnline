import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button} from '@material-ui/core';
import '../App.css';  
import { withStyles } from '@material-ui/core/styles';
import ReactStars from 'react-stars'

//Style
const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        margin: 0,
        padding: 0,
    },

    card: {
        flexGrow: 0,
        flexShrink: 0,
        display: 'flex',
        flexFlow: "column",
        marginBottom: '15px',
       
        [theme.breakpoints.only('lg')]: {
            width: "18%",
        },

        [theme.breakpoints.only('md')]: {
            width: "24%",
          },
        [theme.breakpoints.only('sm')]: {
            width: "24%",
        },

        [theme.breakpoints.only('xs')]: {
            width: "48%",
        },
      },
    
    media: {
        width: '100%',
        height: '20vw',
        objectFit: 'cover',

        [theme.breakpoints.only('lg')]: {
           height: '20vw',
        },

        [theme.breakpoints.only('md')]: {
            height: '30vw',
          },
        [theme.breakpoints.only('sm')]: {
            height: '30vw',
        },

        [theme.breakpoints.only('xs')]: {
            height: '40vw',
        },
    },

    btn: {
        marginTop: 'auto',
    },

  });
  
 
class BookList extends React.Component{

    constructor(props) {
        super(props);
        this.check_cart = this.check_cart.bind(this);
      }  

    //get genru list
    componentDidMount(){
        this.props.onMount(this.props.genruId);
    }
    //Update by click genru from genru list
    componentDidUpdate(prevProps){
        if(this.props.genruId !== prevProps.genruId){
            this.props.onUpdate(this.props.genruId);
        }
    }
    
    //if the book is arelay in the cart, cannot select the book 
    check_cart(bookId){
         for(let i = 0; i <this.props.cart.length; i++){
             if(this.props.cart[i].bookId === bookId){
                 return i;
                }
            }
            return -1;
        }

    render(){
        const { response, error } = this.props;
        const { classes } = this.props; 
        
    return(
        <div>
        {(() => {
  
        if (error) {
            return <p>Data load error!</p>
        }else if(typeof response === 'undefined'){
            return <p>Loading....</p>
        }else{
            return( 
                 <div className={classes.root}>
                    {response.map((item,key) => (
                    <Card key={key} className={classes.card}> 
                   
                    <CardActionArea component={Link} to={`/kcbooks/book/${item.id}`}>
                    <CardMedia component="img" src={item.book.image} alt={item.book.title} className={classes.media}/>
                    </CardActionArea>

                    <CardContent>
                    <Typography variant="subtitle2" gutterBottom >{item.book.title}</Typography>
                    <ReactStars count={5} value={item.aveRate} edit={false} color2={'#ffd700'}/>
                    <Typography variant="caption" gutterBottom >{`by ${item.book.author}`}</Typography>
                    <Typography variant="subtitle2" gutterBottom align="right">{`$${(item.book.price/100).toFixed(2)}`}</Typography>
                    </CardContent>
                    
                    
                    <CardActions className={classes.btn}>
                        {this.check_cart(item.id)===-1 &&
                        <Button variant="outlined" size="small" color="primary" 
                              onClick={() => this.props.addItem(item.id, item.book.title, item.book.price)}>Add to cart</Button> }
                        {this.check_cart(item.id)!==-1 &&
                        <Button variant="outlined" size="small" color="secondary" 
                              onClick={() => this.props.deleteItem(this.check_cart(item.id))} >Remove from cart</Button> }
                    </CardActions>
                  </Card>    
                    
                ))}
              </div>
                
             );
            }
            })()}
        </div>
    );
}
}

BookList.propTypes = {
    classes: PropTypes.object.isRequired,
    genruId: PropTypes.string,
    response: PropTypes.array,
    error: PropTypes.oneOf([undefined,true, false]),
    cart: PropTypes.array,
    message: PropTypes.string,
  };

export default withStyles(styles)(BookList);
