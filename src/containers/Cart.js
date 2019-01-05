import { connect } from 'react-redux';
import Cart from '../components/Cart';

const mapStateToProps =  (state) => ({
        cart: state.Cart.cart,
        username: state.LoginForm.username,
    });

export default connect(mapStateToProps)(Cart);