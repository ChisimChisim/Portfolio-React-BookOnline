import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { TextField, IconButton, InputAdornment, Button, Typography, Divider } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import image from '../images/login_img.jpg';
import '../App.css';


//STYLE
const styles = theme => ({
  root: {
    position:'absolute',
    top:0,
    width:'100%',
    height: '100vh',
    backgroundImage: 'url(' + image + ')',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },

  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    width:330,
  },
  
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',

  },
  button:{
    margin: 20,
    width: 200,
  },
  divider:{
    margin:'auto',
    width: 350
  },

  form:{
  textAlign: 'center',
  margin:'auto',
  backgroundColor:'white',
  opacity:'0.8',
  width:350,
  marginTop:30,
  paddingTop:10,
  paddingBottom:10,
  border: 'groove 1px #d3d3d3',
  },

});


class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false,
    };  
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }  

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword(){
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
 
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
        
        <div className={classes.form}>
        <div className='title'>Kansas City BOOKs</div>
         <div>
         <TextField
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Username"
          onChange={this.handleChange('username')}/>
         </div>
         <div>
        <TextField
          id="outlined-adornment-password"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </div>
        <div>
        <Button variant="contained" color="default" className={classes.button}
             onClick={() => this.props.login(this.state.username, this.state.password)}>
        Login
        </Button>
        </div>

        <div>
        <Divider className={classes.divider}/>
        <Typography>New to Kansas City Books?</Typography>
        <Button variant="contained" color='primary'  className={classes.button}
                         component={Link} to={`/newuser`}>Create your account</Button>
        </div>
       
        </div>
        </div>

      );
    }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);