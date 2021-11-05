

let data = [];
if (typeof window !== "undefined") {
    if (!localStorage.getItem("user")) {
        data = [];
    
    } else {
        data = JSON.parse(localStorage.getItem("user"));
    }
  }

   
    // let  data = JSON.parse(localStorage.getItem("user")) ||null;
 
export const userReducer = (state = null, action)=>{
    switch(action.type){
        case 'LOGIN':
            // const ham =action.payload
            // if(ham){
            //     return ham;
            // }
            // else{
            //     return data;
            // }
   return data
        case "LOGOUT":
   
            return action.payload

        default : 
        return state

        
    }
}