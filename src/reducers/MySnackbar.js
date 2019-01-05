const initialState = {
    open: false,
    variant: "success",
    message: "",
};

export default (state = initialState, action) => {
 
    switch (action.type) {

       case "OPEN_SNACKBAR":
       return{
           open: action.payload.open,
           variant: action.payload.variant,
           message: action.payload.message,
       };

       case "CLOSE_SNACKBAR":
       return{
           ...state,
           open: action.payload.open,
       };

       default:
          return state;
    }
}