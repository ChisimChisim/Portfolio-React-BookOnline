import { fetchLogin } from './LoginForm';

const API_URL_NEWUSER = 'http://localhost:8080/api/user/create';

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


//CREATE NEW USER
export const fetchCreateUser = (str_username, str_firstname, str_lastname, str_password) => {
    return async dispatch => {
        dispatch(closeSnackbar(false));
        try{
           let create_user = await fetch(API_URL_NEWUSER, {
                method: 'POST' ,
                headers: {
                    'Content-Type': 'application/json',   
                  },
              
                body: JSON.stringify({
                    "userId":str_username, 
                    "password":str_password,
                    "firstName":str_firstname,
                    "lastName": str_lastname,
                }),
            });

            if(create_user.status===200){
                create_user.json().then(function(data){
                    if(data===false){
                        dispatch(openSnackbar(true, "error", "The username already exists."));
                    }else{
                        dispatch(fetchLogin(str_username, str_password));
                    }
                    });
            }else{
                dispatch(openSnackbar(true, "error", "System error"));
            }  
        }catch(err){
            dispatch(openSnackbar(true, "error", "System error"));
        }
    }

}