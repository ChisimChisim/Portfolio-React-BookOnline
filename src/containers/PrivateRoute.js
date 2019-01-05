import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute';

const mapStateToProps =  (state) => ({
    authorizated: state.LoginForm.auth,
    });


export default connect(mapStateToProps)(PrivateRoute);