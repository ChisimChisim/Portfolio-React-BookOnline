const initialState = {
    genru: undefined,
    error: false,
}

export default (state = initialState, action) => {
 
    switch (action.type) {
       case "RECIEVE_NAVI_DATA":
       return action.payload.error
         ? {...state, error: true}
         : {
            ...state,
            genru: action.payload.genru,
           };

       default:
          return state;
    }
}