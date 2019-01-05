import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

//STYLE
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[500],
  },
  info: {
    backgroundColor: blue[200],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    textAlign: 'center',
  },

  snackbar:{
      minWidth: window.innerWidth,
      margin: theme.spacing.unit,
  },
  close:{
    color:"inherit",
  }
});


class MySnackbar extends React.Component {

render(){
const { classes, className, message, variant, open } = this.props;
const Icon = variantIcon[variant];

return (

<Snackbar
  open={open}
  autoHideDuration={6000}
  onClose={() => this.props.closeSnackbar()}
  >

<SnackbarContent
className={classNames(classes[variant], classes.snackbar, className)}
aria-describedby="client-snackbar"
message={
    <span id="client-snackbar" className={classes.message}>
      <Icon className={classNames(classes.icon, classes.iconVariant)} />
      {message}
    </span>
  }
action={[
    <IconButton
      key="close"
      aria-label="close"
      className={classes.close}
      onClick={() => this.props.closeSnackbar()}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>,
  ]}
/>
</Snackbar>
);

}
}

MySnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open:  PropTypes.oneOf([true, false]),
  variant: PropTypes.string,
  message:  PropTypes.string,
};

export default withStyles(styles)(MySnackbar);