import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import * as actions from '../actions/LoginForm';

const mapStateToProps =  (state) => ({
    
    });

const mapDispatchToProps= (dispatch) =>({
    login(username, password){
        return dispatch(actions.fetchLogin(username, password));
    },
    });

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);