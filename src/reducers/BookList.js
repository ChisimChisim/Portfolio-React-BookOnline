

const initialState = {
    genruId: undefined,
    response: undefined,
    error: false,
};

export default (state = initialState, action) => {
 
    switch (action.type) {

       case "START_BOOKLIST_REQUEST":
       return{
           genruId: action.payload.genruId,
           response: undefined,
           error: false,
           message: undefined
       };

       case "RECIEVE_BOOKLIST_DATA":
       return action.payload.error
         ? {...state, error: true}
         : {
            ...state,
            response: action.payload.response,
           };

        case "ADD_ITEM":
        return action.payload.message
        ? {...state, 
            message: action.payload.message,
        }:{...state,};

       default:
          return state;
    }
}