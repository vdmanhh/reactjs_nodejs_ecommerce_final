export const drawerReducer = (state = false, action)=>{
    switch(action.type){
        case "SET_VISIBLEE":
        return action.payload;
         default:
        return state;
    }
}