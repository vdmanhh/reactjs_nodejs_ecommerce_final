import React, { useState } from 'react';
// import {auth} from "../../Firebase"
import {auth} from '../../Firebase'
import { toast } from 'react-toastify';
const Register=()=> {
    const [email, setEmail] = useState('')

    async function btnRegister(e){
        e.preventDefault()
        // console.log(process.env.URL);
        const config ={
            url : 'http://localhost:3000/register-comple',
            handleCodeInApp : true,
        };
        await auth.sendSignInLinkToEmail(email,config);
        toast.success("Vui lòng kiểm tra email của bạn ! ")
        localStorage.setItem("emailRegister",email)
        setEmail("")
    }
    return (
        <div className="mt-5">
              <form className="form_login">
        <h3 className="title_login">Welcom to Register</h3>
            <div className="form-group form_input">
                <label htmlFor />
                <input onChange={e=>setEmail(e.target.value)}  type="text" className="form-control" name id aria-describedby="helpId" placeholder="email" />
              
            </div>
            <button onClick={btnRegister}  className="btn btn-danger btn_login mt-2">Đăng ký</button>

        </form>
        </div>
    );
}

export default Register;