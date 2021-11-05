import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
function RedirectUrl() {
    const [count,setCount] =useState(5)
    const history = useHistory();
    useEffect(() => {
       const interval = setInterval(()=>{
           setCount((currentCount) => --currentCount);
       },1000)
       count === 0 &&history.push('/home');
       return ()=> clearInterval(interval)
    }, [count,history])
    return (
       
            <div className=" redirectt text-center mt-5">
               <h2> Bạn sẽ được đưa đến Trang chủ trong {count} giây nữa</h2>
            </div>
     
    );
}


export default RedirectUrl;