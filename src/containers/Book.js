import { connect } from 'react-redux';
import Book from '../components/Book';
import * as actionsBook from '../actions/Book';
import * as actionsBookList from '../actions/BookList';


const mapStateToProps =  (state, ownProps) => ({
        bookId: ownProps.bookId,
        response: state.Book.response,
        reviews: state.Book.reviews,
        username: state.LoginForm.username,
        rolename: state.LoginForm.rolename,
        cart: state.Cart.cart,
        error:state.Book.error,
    });

const mapDispatchToProps= (dispatch) =>({
        onMount(bookId){
            dispatch(actionsBook.fetchBook(bookId));
        },
        onUpdate(bookId){
            dispatch(actionsBook.fetchBook(bookId));
        },
        addItem(bookId, title, price){
            dispatch(actionsBookList.addItem(bookId, title, price));
        },
        deleteItem(index){
            dispatch(actionsBookList.deleteItem(index));
        },
        addReview(bookId, rate, review){
            dispatch(actionsBook.fetchAddReview(bookId, rate, review));
        },
        deleteReview(bookId, username){
            dispatch(actionsBook.fetchdeleteReview(bookId, username));
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(Book);