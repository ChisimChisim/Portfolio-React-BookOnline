const initialState = {
    cart: [],
    error: false,
};

export default (state = initialState, action) => {
 
    switch (action.type) {

       case "ADD_ITEM":
       return {
          ...state,
           cart: state.cart.concat([{bookId:action.payload.bookId, title:action.payload.title, price:action.payload.price}])
       };

       case "DELETE_ITEM":
       return action.payload.index===-1
        ?{...state}
        :(action.payload.index===0)
        ?{...state,  cart:  [].concat(state.cart.slice(1))}
        :(action.payload.index===state.cart.length-1)
        ?{...state, cart: [].concat(state.cart.slice(0, -1))}
        :{...state, cart: [].concat(
            state.cart.slice(0, action.payload.index),
            state.cart.slice(action.payload.index + 1))}

        case "EMPTY_CART":
        return {
            cart: [],
            error: false,
       };

       case "FINISH_LOGOUT":
       return {
           cart: [],
           error: false,
       }


       default:
          return state;
    }
}