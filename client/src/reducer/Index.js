import {userReducer} from "./userReducer"
import {combineReducers} from "redux" 
import {cartReducer} from './cartReducer'
import {drawerReducer} from './drawerReducer'
import {searchReducer} from './searchReducer'
const rootReducer = combineReducers({
    user : userReducer,
    cart : cartReducer,
    draw : drawerReducer,
    search : searchReducer
})
export default rootReducer