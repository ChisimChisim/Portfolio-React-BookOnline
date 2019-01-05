import Cookies from 'universal-cookie';

const API_URL_GENRU = 'http://localhost:8080/api/genru';
const API_URL_LOGOUT = 'http://localhost:8080/api/logout';

const receiveData = (genru, error) => ({
    type: 'RECIEVE_NAVI_DATA' ,
    payload: {
        genru,
        error,
    }
});

const finishlogout = () =>({
    type: 'FINISH_LOGOUT',

});

//Get Book Description
export const fetchGenru = () => {
    return async dispatch => {
        try{
            let response = await fetch(API_URL_GENRU);
            let data = await response.json();
            dispatch(receiveData(data, null));
        }catch(err){
            dispatch(receiveData(err));
        }
    }
}

//LOGOUT
export const fetchLogout = () => {
    return async dispatch => {
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwtToken');
        cookies.remove('jwtToken', { path: '/' , maxAge:7200});  
    
        sessionStorage.setItem("auth", false); 
        await fetch(API_URL_LOGOUT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": jwtToken, },  
            }
        );
            await dispatch(finishlogout(null));    
    }
}  