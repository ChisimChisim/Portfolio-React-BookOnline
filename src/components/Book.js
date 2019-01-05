import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Dialog, DialogTitle, DialogContent, 
    TextField, DialogActions, Card, Avatar, CardHeader, CardContent} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReactStars from 'react-stars'
import deepOrange from '@material-ui/core/colors/deepOrange';     
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



const styles = theme => ({
    container: {

        [theme.breakpoints.up('sm')]: {
            display: 'flex',
          },
        [theme.breakpoints.only('xs')]: {
            display: 'block',
        },

        marginTop: '10px',
    },

    img_content:{

        [theme.breakpoints.up('sm')]: {
            width:'20%',
          },

        [theme.breakpoints.only('xs')]: {
            width:'50%',
        },
        
        order:'1',
        margin:'auto',
    },

    text_content:{

        [theme.breakpoints.up('sm')]: {
            width:'80%',
          },
        [theme.breakpoints.only('xs')]: {
            width:'100%',
        },

        order:'2',
        padding: '10px',
      },
    
    media: {
        width: '100%',
        height: '20vw',
        objectFit: 'cover',
    
    },

    button:{
        textAlign : 'center', 
        marginTop: '10px',
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },

    card: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },

      },
    
    cardHeader: {

        flex: '0 0 auto',
        display:'flex',
        flexDirection: 'row',
      },
    
    cardContent: {
        
      },

    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
      },

    reviewTitle: {
        margin: '10px auto',
        display:'flex',
        justifyContent: 'center',
    },

    ADMIN:{
        display: 'block',
    },

    USER:{
        display: 'none',

    }
      
});

class Book extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            rating: 1,
            review:'',
          };
        this.check_cart = this.check_cart.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
        this.handleAddReview = this.handleAddReview.bind(this);
        this.check_reviews = this.check_reviews.bind(this);
        this.displayAvatar = this.displayAvatar.bind(this);
      }  

    componentDidMount(){
        this.props.onMount(this.props.bookId);

    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.bookId !== prevProps.bookId){
            this.props.onUpdate(this.props.bookId);
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

    handleClickOpen = () => {
        let myRate = this.check_reviews();
        if(myRate===-1){
          this.setState({ open: true, rating: 1});
        }else{
          this.setState({ open: true, rating: myRate.rate });
        }
        
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    ratingChanged = (newRating) => {
        this.setState({rating: newRating});
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };

    handleAddReview = (id, rating, review) =>{
        this.handleClose();
        this.props.addReview(id, rating, review);
    }

    handleDeleteReview = (id, username) =>{
        this.handleClose();
        this.props.deleteReview(id, username);
    }

    //Check that loign user already add review or not.
    check_reviews(){
        for(let i = 0; i <this.props.reviews.length; i++){
            if(this.props.reviews[i].reviewId.userId === this.props.username ){
                return this.props.reviews[i];
               }
           }
           return -1;
    }

    displayAvatar(first, last){
        let fn = first.slice(0,1);
        let ln = last.slice(0,1);
        return fn.concat(ln)
      }


    render(){
        const item = this.props.response;
        const {error, classes, reviews} = this.props;
    return(
        <div>
            {(() => {
                if (error) {
                    return <p>Data load error!</p>
                }else if(typeof item === 'undefined'){
                    return <p>Loading....</p>
                }else{
                    return(
                       <div>
                         <Typography variant="h4" gutterBottom>{item.book.title}</Typography>
                         <ReactStars count={5} size={24} value={item.aveRate} edit={false} color2={'#ffd700'} />
                         <div className={classes.container}>
                           <div className={classes.img_content}>
                             <img src={item.book.image} alt={item.book.title} width='95%'/>
                             <div className={classes.button}>
                             {this.check_cart(item.id)===-1 &&
                               <Button variant="outlined" size="small" color="primary" 
                              onClick={() => this.props.addItem(item.id, item.book.title, item.book.price)}>Add to cart</Button> }
                             {this.check_cart(item.id)!==-1 &&
                               <Button variant="outlined" size="small" color="secondary" 
                              onClick={() => this.props.deleteItem(this.check_cart(item.id))} >Remove from cart</Button> }
                             </div>
                           </div>
                           <div className={classes.text_content}>
                             <Typography variant="body2" gutterBottom>{item.book.text}</Typography>
                             <Typography variant="subtitle2" gutterBottom>{`Author: ${item.book.author}`}</Typography>
                             <Typography variant="subtitle2" gutterBottom>{`Relesed date: ${item.book.releasedDate}`}</Typography>
                             <div className={classes.button}>

                              {this.check_reviews()===-1 &&
                                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                                    Add your rating
                                 </Button>}
                              {this.check_reviews()!==-1 &&     
                                  <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                                     Change your rating
                                  </Button>}

                            </div>
                           </div>
                             
{/** ADD COMMENT DIALOG*/}
{this.check_reviews()===-1 &&
                            <Dialog   open={this.state.open}
                                      onClose={this.handleClose}
                                      aria-labelledby="form-dialog-title"
                                      fullWidth
                                      maxWidth = 'sm'
                                      >
                            <DialogTitle id="form-dialog-title">Add Your Rating!</DialogTitle>
                            <DialogContent>
                            <ReactStars count={5} size={36} color2={'#ffd700'} 
                                     onChange={this.ratingChanged}
                                     value={this.state.rating} 
                                     half={false}/>  
                            <TextField
                               autoFocus
                               margin="normal"
                               multiline
                               rows="1"
                               id="outlined-multiline-static"
                               placeholder="Add your review (optional)"
                               fullWidth 
                               defaultValue = {this.check_reviews().comment}
                               onChange={this.handleChange('review')}/>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Cancel
                            </Button>
                            <Button onClick={() => {this.handleAddReview(item.id, this.state.rating, this.state.review)}} color="primary">
                            Add your rating
                            </Button>
                            </DialogActions>
                            </Dialog>
}
{/** CHANGE COMMENT DIALOG*/}
{this.check_reviews()!==-1 &&
                              <Dialog   open={this.state.open}
                              onClose={this.handleClose}
                              aria-labelledby="form-dialog-title"
                              fullWidth
                              maxWidth = 'sm'
                              >
                    <DialogTitle id="form-dialog-title">Change Your Rating!</DialogTitle>
                    <DialogContent> 
                    <ReactStars count={5} size={36} color2={'#ffd700'} 
                      onChange={this.ratingChanged}
                      value={this.state.rating} 
                      half={false}/>
                    <TextField
                       autoFocus
                       margin="normal"
                       multiline
                       rows="1"
                       id="outlined-multiline-static"
                       placeholder="Add your review (optional)"
                       fullWidth 
                       defaultValue = {this.check_reviews().comment}
                       onChange={this.handleChange('review')}/>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={() => {this.handleAddReview(item.id, this.state.rating, this.state.review)}} color="primary">
                    Change your rating
                    </Button>his.handleAddReview
                    <Button onClick={() => {this.handleDeleteReview(item.id, this.props.username)}} color="secondary">
                    Delete your rating
                    </Button>
                    </DialogActions>
                    </Dialog>
    
}
                         </div>
{/** DISPLAY REVIEWS*/}
                         <div className={classes.reviewTitle}>
                         <Typography variant="h6">{`${reviews.length} REVIEWS | ${item.aveRate.toFixed(1)}`}</Typography> 
                         <ReactStars count={5} size={24} value={item.aveRate} edit={false} color2={'#ffd700'} />
                         </div>

                         {reviews.map((review,key) => (
                          <Card key={key} className={classes.card}>
                          {this.props.username===review.user.userId &&
                              <CardHeader 
                              avatar={<Avatar className={classes.orangeAvatar}>{this.displayAvatar(review.user.firstName, review.user.lastName)}</Avatar>}
                              title={<ReactStars count={5} size={16} value={review.rate} edit={false} color2={'#ffd700'} /> }
                              
                              action={
                                <IconButton className={classes[this.props.rolename]}
                                onClick={() => {this.handleDeleteReview(item.id, review.reviewId.userId)}}>
                                  <DeleteIcon  />
                                </IconButton>
                              }
                      
                              className={classes.cardHeader}
                              />}
                          {this.props.username!==review.user.userId &&    
                              <CardHeader 
                              avatar={<Avatar>{this.displayAvatar(review.user.firstName, review.user.lastName)}</Avatar>}
                              title={<ReactStars count={5} size={16} value={review.rate} edit={false} color2={'#ffd700'} />}
                              action={
                                <IconButton  className={classes[this.props.rolename]}
                                onClick={() => {this.handleDeleteReview(item.id, review.reviewId.userId)}}>
                                  <DeleteIcon />
                                </IconButton>
                              }
                              className={classes.cardHeader}
                             />}
                              <CardContent className={classes.cardContent}>
                              <Typography variant="body2" gutterBottom>{review.comment}</Typography>
                              </CardContent> 
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

Book.propTypes = {
    classes: PropTypes.object.isRequired,
    genruId: PropTypes.string,
    response: PropTypes.object,
    error: PropTypes.oneOf([undefined,true, false]),
    cart: PropTypes.array,
    message: PropTypes.string,
  };

export default withStyles(styles)(Book);

