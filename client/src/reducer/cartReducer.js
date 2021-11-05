
let initialState = [];
if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      initialState = JSON.parse(localStorage.getItem("cart"));
    } else {
      initialState = [];
    }
  }


  export const cartReducer = (state = null, action) => {
    switch (action.type) {
      case "ADD_TO_CARTT":
        return action.payload;
      default:
        return state;
    }
  };