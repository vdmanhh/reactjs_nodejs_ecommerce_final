import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {CreatOrUpdateUser} from "../../function/User"
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {auth} from '../../Firebase'
const RegisterComple=()=> {
    const history = useHistory()
    const [email,setEmail]=useState('')
    const [password,setPassword] = useState('')
     const dispatch = useDispatch();
    useEffect(()=>{
        setEmail(localStorage.getItem("emailRegister"))
    },[])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(password);
        if(!email || !password){
            toast.error("ban phai dien dung tai khoan va mat khau")
        }
        if(password.length <6){
            toast.error("Mat khau phai it nhat 6 ky tu !")
        }

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            )
            console.log('result:' + JSON.stringify(result));
            if (result.user.emailVerified) {
                window.localStorage.removeItem("emailRegister");
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                console.log("idTokenResult"+idTokenResult);

                CreatOrUpdateUser(idTokenResult.token)
                .then(res=>{
                    console.log("res");
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            name:res.data.name,
                            email: user.email,
                            token: idTokenResult.token,
                            role : res.data.role,
                            _id : res.data._id
                        }
                    })
                    toast.success("Chuc mung ban da dang ky tai khoan thanh cong !")
                    history.push('/login');
                }).catch()
                history.push('/');
            }
        } catch (error) {
            console.log('error:' + error);
            toast.error("ban can nhap mat khau dang ki truoc khi nhan submit")
        }

    }
    return (
        <div className="mt-5">
           <form className="form_login">
            <h3 className="title_login mb-3">Welcom to Register Complete</h3>
                <div className="form-group form_input">
                    <input value={email} disabled type="email" className="form-control" name id aria-describedby="helpId" />
                </div>
                <div className="form-group form_input">
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" name id aria-describedby="helpId" placeholder="password" />
                </div>
                <button  type="reset" onClick={handleSubmit} className="btn btn-danger btn_login mt-2">Complete Register</button>
            </form>
        </div>
    );
}

export default RegisterComple;