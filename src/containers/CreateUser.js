import { connect } from 'react-redux';
import CreateUser from '../components/CreateUser';
import * as actions from '../actions/CreateUser';

const mapStateToProps =  (state) => ({
    
    });

const mapDispatchToProps= (dispatch) =>({
    createUser(username, firstname, lastname, password){
        return dispatch(actions.fetchCreateUser(username, firstname, lastname, password));
    },
    });

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);