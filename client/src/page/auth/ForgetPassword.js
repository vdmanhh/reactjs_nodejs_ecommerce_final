import React,{useState} from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../Firebase';
import {forgetPass} from '../../function/User'
const ForgetPassword=()=> {
    const [email,setEmail] = useState('');
    const [loading,setLoading] = useState(false)
   const checkk = async()=>{
    const config ={
        url : 'http://localhost:3000/login',
        handleCodeInApp: true,
    };
    await auth.sendPasswordResetEmail(email,config)
    .then(()=>{
        setEmail('')
  
        toast.success("Kiểm tra email của bạn để reset mật khẩu")
    })
   }
    async function btnForgetPass(e){
        e.preventDefault();
        setLoading(true)
        forgetPass(email)
        .then(res=>{
         if(res.data.kq === "oke"){
            checkk();
            setLoading(false)
         }
         else{
             toast.error("khong ton tai dia chi email nay !")
             setLoading(false)
         }
        })
      
       
    }
    return (
        <div className="mt-5">
          <form className="form_login">
        {loading ? <h3>Loading...</h3> : <h3 className="title_login">Forget password</h3>}
            <div className="form-group form_input">
                <label htmlFor />
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" name id aria-describedby="helpId" placeholder="email" />
              
            </div>
           
            <button disabled={!email} onClick={btnForgetPass}  className="btn btn-danger btn_login mt-2">Submit</button>

        </form>
        </div>
    );
}

export default ForgetPassword;