import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {auth} from '../../Firebase'
import {CreatOrUpdateUser} from "../../function/User"
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Spin } from 'antd';
import {
    Link
  } from "react-router-dom";
  import {useSelector} from 'react-redux'
const Login=()=> {
    const dispatch = useDispatch();
    const [email,setEmail] = useState('manhducvuhaha69@gmail.com')
    const [password,setPassword] = useState('maimaimaimai')
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const {user} = useSelector((state)=>({...state}))
   useEffect(() => {
       

    let intended = history.location.state;
    if(intended){
       return
    }
    else {
        if(user && user.token){
            history.push('/home')
           }
         
    }
    
   }, [user,history])
    const CheckingRole=(res)=>{ 
        let intended = history.location.state;
        if(intended){
            console.log('intended',intended);
            history.push(intended.from)
        }

          else{
            if (res.data.role === "admin") {
                history.push('/admin')
            }
            else {
                history.push('/home')
            } 
          }  
    }
    const btnLogin=async(e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const  user1 = result.user;
            const idTokenResult = await user1.getIdTokenResult();

            CreatOrUpdateUser(idTokenResult.token)
                .then(res => {
                   
                    dispatch({
                        type: 'LOGIN',
                        payload: {

                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,
                        }
                    })
                    setLoading(false)
                    CheckingRole(res)
                    console.log("login==",res.data.role);
                    const user ={
                       name: res.data.name,
                       email: res.data.email,
                       token: idTokenResult.token,
                       role: res.data.role,
                       _id: res.data._id,
                    }
                    localStorage.setItem('user',JSON.stringify(user))
                  
                })



            toast.success("login success")

        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error("tai khoan hoac mat khau khong chinh xac !")

        }
    }
    return (
        <div className="mt-5">
             <form className="form_login">
               {loading ? <h3>Loading <Spin /> <Spin /> <Spin /></h3> :  <h3 className="title_login">Welcom to Login</h3>}
                <div className="form-group form_input">
                    <label htmlFor />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" name id aria-describedby="helpId" placeholder="email" />

                </div>
                <div className="form-group">
                    <label htmlFor />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" name id aria-describedby="helpId" placeholder="password" />

                </div>
                <button disabled={!email || password.length < 6} onClick={btnLogin} className="btn btn-danger btn_login">Login</button>
                <Link to={'/forget-password'} className='link_forgetpass' ><i class="fas fa-key mr-2"></i>Forget password</Link>
            </form>
        </div>
    );
}

export default Login;