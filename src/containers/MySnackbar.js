import { connect } from 'react-redux';
import MySnackbar from '../components/MySnackbar';
import * as actions from '../actions/MySnackbar';

const mapStateToProps =  (state) => ({
        open: state.MySnackbar.open,
        variant: state.MySnackbar.variant,
        message: state.MySnackbar.message,
    });

const mapDispatchToProps= (dispatch) =>({
    closeSnackbar(){
        return dispatch(actions.closeSnackbar(false));
    },
        });
    
export default connect(mapStateToProps, mapDispatchToProps)(MySnackbar);