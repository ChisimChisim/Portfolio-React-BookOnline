import { connect } from 'react-redux';
import CheckoutForm from '../components/CheckoutForm';
import * as actions from '../actions/CheckoutForm';


const mapStateToProps =  (state) => ({
   
});

const mapDispatchToProps= (dispatch) =>({
    openSnackbar(open, variant, message){
        dispatch(actions.openSnackbar(open, variant, message));
    },
    emptyCart(){
        dispatch(actions.emptyCart());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);