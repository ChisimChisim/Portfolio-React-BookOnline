import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Main from './components/Main';
import LoginForm from './containers/LoginForm';
import CreateUser from './containers/CreateUser';
import PrivateRoute from './containers/PrivateRoute';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import MySnackbar from './containers/MySnackbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {

  render() {
    return (
      <div className='App'>
      <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        {/* Setting Route */}
        <Switch>
        <Route exact path="/" render={()=><LoginForm />} />
        <Route exact path="/newuser" render={()=><CreateUser />} />
         {/* PrivateRoute => Authentication: Users need to login */}
        
        <PrivateRoute>   
             <Route path="/kcbooks" component={Main}/>
        </PrivateRoute>
  
        </Switch>
      </React.Fragment>
      <MySnackbar />
      </MuiThemeProvider>

      </div>
    );
  }
}

export default App;
