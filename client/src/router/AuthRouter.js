import React from 'react';
import {useSelector} from 'react-redux'
import RedirectUrl from './RedirectUrl'
import {
    Route, 
  } from "react-router-dom";
const AuthRouter=({children,...rest})=> {
    const {user} = useSelector((state)=>({...state}))
    return user && user.token ? <Route {...rest} render={()=>children} /> : (<RedirectUrl></RedirectUrl>)
}

export default AuthRouter;