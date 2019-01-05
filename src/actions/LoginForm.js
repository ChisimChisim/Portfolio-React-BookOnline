import qs from 'qs';
import { push } from 'react-router-redux';
import Cookies from 'universal-cookie';

const API_URL_LOGIN = 'http://localhost:8080/api/login';
const API_URL_USER = 'http://localhost:8080/api/user/auth';

const startRequest = (username) => ({
    type: 'START_LOGIN',
    payload: { 
       username,
    }
});

const finishRequest = (username, firstname, lastname, rolename, auth) => (
{
    type: 'FINISH_LOGIN',
    payload:{
        username,
        firstname,
        lastname,
        rolename,
        auth, 
    }
});

const openSnackbar = (open, variant, message) => ({
    type: 'OPEN_SNACKBAR',
    payload: {
        open,
        variant,
        message,
    }
});

const closeSnackbar = (open) => ({
    type: 'CLOSE_SNACKBAR',
    payload: {
        open,
    }
});


//LOGIN  
export const fetchLogin = (str_username, str_password) => {
    return async dispatch => {
        sessionStorage.setItem("auth", false); 
        await dispatch(startRequest(str_username));
        try{
           let res_login = await fetch(API_URL_LOGIN, {
                method: 'POST' ,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',   
                  },
              
                body: qs.stringify({"username":str_username, "password":str_password}),
            });

            if(res_login.status===200){
                const cookies = new Cookies();
                const jwtToken = res_login.headers.get('Authorization') 
                cookies.set('jwtToken',  jwtToken, { path: '/' , maxAge:7200});    //Set JwtToken to Cookie
                let authUser = await fetch(API_URL_USER,{
                    method: 'GET' ,
                    headers: {
                        "Authorization": jwtToken,
                    },
                 
                });
                if(authUser.status===200){
                    authUser.json().then(function(data){
                        dispatch(finishRequest(str_username, data.firstName, data.lastName, data.roleName, true)); 
                        dispatch(closeSnackbar(false));
                        sessionStorage.setItem("auth", true); 
                        dispatch(push('/kcbooks'));
                    });
                }else{
                    dispatch(finishRequest(str_username, null, null, null, false));
                    dispatch(openSnackbar(true, "error",  "Unauthorizated"));
                }
            }else{
                dispatch(finishRequest(str_username, null, null, null, false));
                dispatch(openSnackbar(true, "error", "Username and Password is invalid"));
            }
        }catch(err){
            dispatch(finishRequest(str_username, null, null, null, false));
            dispatch(openSnackbar(true, "error", "System error"));
        }
    }
}  

