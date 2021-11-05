import React, { useEffect, useState } from 'react';
import RedirectUrl from './RedirectUrl';
import {
  
    Route,
  } from "react-router-dom";
import { useSelector } from 'react-redux';
import {checkAdmin} from "../function/User"

const AdminRouter=({children,...rest})=> {
    const {user} = useSelector((state)=>({...state}));
    const [oke,setOke] = useState(false);
    
    useEffect(() => {
        if(user &&user.token){
        const {email} = user;
        // console.log('email=>',user);
        checkAdmin({email},user.token)
        .then(res=>{
            setOke(true)
        }).catch(err=>setOke(false))
        
       
    }
},[user])
    return oke ? <Route {...rest}></Route> : (<RedirectUrl></RedirectUrl>)
}

export default AdminRouter;