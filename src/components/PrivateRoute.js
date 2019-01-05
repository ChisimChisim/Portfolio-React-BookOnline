import React from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

class PrivateRoute extends React.Component {

  render() {
    return(
      this.props.authorizated
        ? this.props.children
        : <Redirect to={'/'}/>
    );   
  }
}

PrivateRoute.propTypes = {
  authorizated: PropTypes.oneOf([true, false]),
};

export default PrivateRoute;