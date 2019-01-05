const initialState = {
    username: undefined,
    firstname: undefined,
    lastname: undefined,
    rolename: undefined,
    auth: false,
};

export default (state = initialState, action) => {
 
    switch (action.type) {

       case "START_LOGIN":
       return{
           username: action.payload.username,
           firstname: undefined,
           lastname: undefined,
           rolename: undefined,
           auth: false,
       };

       case "FINISH_LOGIN":
       return {
            username: action.payload.username,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            rolename: action.payload.rolename,
            auth: action.payload.auth,
           };

       case "FINISH_LOGOUT":
       return{
           username: undefined,
           firstname: undefined,
           lastname: undefined,
           rolename: undefined,
           auth: false,
       };   

       default:
          return state;
    }
}