import { connect } from 'react-redux';
import Navi from '../components/Navi';
import * as actions from '../actions/Navi';

const mapStateToProps = state => ({
    genru: state.Navi.genru,
    error: state.Navi.error,
    firstname: state.LoginForm.firstname,
    lastname: state.LoginForm.lastname,
    cart: state.Cart.cart,
});

const mapDispatchToProps= (dispatch) =>({
    onMount_Nav(){
        return dispatch(actions.fetchGenru());
    },
    logout(){
        return dispatch(actions.fetchLogout());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navi);