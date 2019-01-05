
const initialState = {
    bookId: undefined,
    response: undefined,
    reviews:[],
    error: false,
};

export default (state = initialState, action) => {
 
    switch (action.type) {

       case "START_BOOK_REQUEST":
       return{
           bookId: action.payload.bookId,
           response: undefined,
           reviews:[],
           error: false,
       };

       case "RECIEVE_BOOK_DATA":
       return action.payload.error
         ? {...state, error: true}
         : {
            ...state,
            response: action.payload.response,
           };

        case "RECIEVE_REVIEW_DATA":   
        return {
        ...state,
            reviews: action.payload.reviews,
           };

       default:
          return state;
    }
}