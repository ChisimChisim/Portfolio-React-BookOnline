import qs from 'qs';
import Cookies from 'universal-cookie';

const API_URL_BOOK = 'http://localhost:8080/api/books';
const API_URL_RATING = 'http://localhost:8080/api/reviews';

const startRequest = (bookId) => ({
    type: 'START_BOOK_REQUEST',
    payload: { 
       bookId,
    }
});

const receiveData = (bookId, response, error) => ({
    type: 'RECIEVE_BOOK_DATA' ,
    payload: {
        bookId,
        response,
        error,
    }
});

const receiveReview = (bookId, reviews, error) => ({
    type: 'RECIEVE_REVIEW_DATA' ,
    payload: {
        bookId,
        reviews,
        error,
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


export const fetchBook = bookId => {
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwtToken');
    return async dispatch => {
        dispatch(startRequest(bookId));
        let param = qs.stringify({book_id: bookId});
        try{
            let response = await fetch(`${API_URL_BOOK}?${param}`);
        if(response.status===200){   
            response.json().then(function(data1){
                    dispatch(receiveData(bookId, data1, null));
                }); 
            let reviews = await fetch(`${API_URL_RATING}?${param}`, {
                method: 'GET' ,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',    
                    "Authorization": jwtToken,
                  },
            });
            if(reviews.status===200){
                    reviews.json().then(function(data2){
                        dispatch(receiveReview(bookId, data2, null));});
                }else{
                    dispatch(openSnackbar(true, "error", "System Error1"));
                }  
            
            }else{
                dispatch(openSnackbar(true, "error", "System Error2"));
            }        
        }catch(err){
            dispatch(receiveData(bookId, null, err));
            dispatch(openSnackbar(true, "error", err));
        }
           
    }
};

//Add Review
export const fetchAddReview = (bookId, rate, review) =>{
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwtToken');
    return async dispatch => {
        try{
            let add_review = await fetch(API_URL_RATING, {
                 method: 'POST' ,
                 headers: {
                     'Content-Type': 'application/json',   
                     "Authorization": jwtToken,
                   },
                 body: JSON.stringify({bookId:bookId, rate:rate, comment:review})
             });
             if(add_review.status===200){
                dispatch(openSnackbar(true, "success", "Thank you for adding your rating!"));
                dispatch(fetchBook(bookId));
             }else{
                dispatch(openSnackbar(true, "error", "Failed to add your rating.")); 
             }
            }catch(err){
                dispatch(openSnackbar(true, "error", "System Error"));
            }
    }
};

//Delete Review
export const fetchdeleteReview = (bookId, username) =>{
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwtToken');
    return async dispatch => {
        try{
            let delete_review = await fetch(API_URL_RATING, {
                 method: 'DELETE' ,
                 headers: {
                    'Content-Type': 'application/json',   
                     "Authorization": jwtToken,
                   },
                 body: JSON.stringify({bookId:bookId, userId:username})
             });
             if(delete_review.status===200){
                dispatch(openSnackbar(true, "success", "Deleted successfully."));
                dispatch(fetchBook(bookId));
             }else{
                dispatch(openSnackbar(true, "error", "Failed to delete your rating.")); 
             }
            }catch(err){
                dispatch(openSnackbar(true, "error", "System Error"));
            }
    }
};