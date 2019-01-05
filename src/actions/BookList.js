const API_URL_BOOKLIST_GENRU = 'http://localhost:8080/api/books/genru';
const API_URL_BOOKLIST_ALL = 'http://localhost:8080/api/books/all';

const startRequest = (genruId) => ({
    type: 'START_BOOKLIST_REQUEST',
    payload: { 
       genruId,
    }
});

const receiveData = (genruId, error, response) => ({
    type: 'RECIEVE_BOOKLIST_DATA' ,
    payload: {
        genruId,
        error,
        response,
    }
});

export const addItem = (bookId, title, price) => ({
    type: 'ADD_ITEM',
    payload:{
        bookId,
        title,
        price,
    }
});

export const deleteItem = (index) =>({
    type: 'DELETE_ITEM',
    payload:{
        index,
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

//Get Book Description
export const fetchBooks = genruId => {
    return async dispatch => {
        dispatch(startRequest(genruId));
        if (genruId==="0"){
            try{
                let response = await fetch(API_URL_BOOKLIST_ALL);
                response.json().then(function(data){
                dispatch(receiveData(genruId, null, data));});
            }catch(err){
                dispatch(receiveData(genruId, err));
                dispatch(openSnackbar(true, "error", "System Error"));
            }
        }else{
            try{
                let response = await fetch(`${API_URL_BOOKLIST_GENRU}/${genruId}`);
                response.json().then(function(data){
                    dispatch(receiveData(genruId, null, data));});
            }catch(err){
                dispatch(receiveData(genruId, err));
                dispatch(openSnackbar(true, "error", "System Error"));
            }
        }
    }  
}

