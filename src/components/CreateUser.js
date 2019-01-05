import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { TextField, IconButton, InputAdornment, Button, Typography} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import image from '../images/login_img.jpg'
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

  form:{
    textAlign: 'center',
    margin:'auto',
    backgroundColor:'white',
    opacity:'0.8',
    width:350,
    marginTop:20,
    marginBottom:20,
    paddingTop:10,
    paddingBottom:10,
    border: 'groove 1px #d3d3d3',
    }
  
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
    this.submit = this.submit.bind(this);
  }  

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword(){
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  submit(input){
    let error = false;
    Object.entries(input).forEach(([key, val]) => {
      console.log(input);
     if(val==='' || typeof val==='undefined'){
       this.setState({[key+'_error']: true, [key+'_helper']: ["Enter your "+key]});
       error = true;
     }else{
       this.setState({[key+'_error']: false, [key+'_helper']: ""});
     }
    });
    if(!error){
     this.props.createUser(input['username'], input['first name'], input['last name'], input['password']);
    }
  }
 
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
        <div className={classes.form}>
        <div className='title'>Kansas City BOOKs</div>
         <div>
         <TextField
          id="outlined-required"
          required = {true}
          error = {this.state.username_error}
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Username"
          onChange={this.handleChange('username')}
          helperText={this.state.username_helper}/>
         </div>

         <div>
         <TextField
          id="outlined-required"
          required = {true}
          error = {this.state['first name_error']}
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="First name"
          onChange={this.handleChange('firstname')}
          helperText={this.state['first name_helper']}/>
         </div>

         <div>
         <TextField
          id="outlined-required"
          required = {true}
          error = {this.state['last name_error']}
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Last name"
          onChange={this.handleChange('lastname')}
          helperText={this.state['last name_helper']}/>
         </div>

         <div>
        <TextField
          id="outlined-adornment-password outlined-required"
          required = {true}
          error = {this.state.password_error}
          helperText={this.state.password_helper}
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
                  onClick={this.handleClickShowPassword}>
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </div>
        <div>
        <Button variant="contained" color='primary' className={classes.button}
             onClick={() => this.submit({'username':this.state.username, 
                 'first name':this.state.firstname, 'last name':this.state.lastname, 'password':this.state.password})}>
           Create your account
        </Button>
        <Typography>Already have an account? <Link to={`/`}>Sign in</Link></Typography> 
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