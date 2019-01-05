import { connect } from 'react-redux';
import BookList from '../components/BookList';
import * as actions from '../actions/BookList';

const mapStateToProps =  (state, ownProps) => ({
        genruId: ownProps.genruId,
        response: state.BookList.response,
        error:state.BookList.error,
        cart: state.Cart.cart,
        message: state.BookList.message,
    });

const mapDispatchToProps= (dispatch, ownProps) =>({
        onMount(genruId){
            dispatch(actions.fetchBooks(genruId));
        },
        onUpdate(genruId){
            dispatch(actions.fetchBooks(genruId));
        },
        addItem(bookId, title, price){
            dispatch(actions.addItem(bookId, title, price));
        },
        deleteItem(index){
            dispatch(actions.deleteItem(index));
        }
    });

export default connect(mapStateToProps, mapDispatchToProps)(BookList);