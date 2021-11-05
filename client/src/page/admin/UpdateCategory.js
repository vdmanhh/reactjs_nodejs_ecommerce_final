import React, { useEffect, useState } from 'react';
import Navbar from '../../form/Navbar';
import {useSelector} from "react-redux"
import { findCategory, updateCate } from '../../function/category';
import { useParams,useHistory } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';

const UpdateCategory=()=> {
    const history = useHistory()
    const {user} = useSelector((state)=>({...state}))
    const [name,setName] = useState('')
    const {slug} = useParams();
    const btnupdate=(e)=>{
     e.preventDefault();
     let {email} = user
     updateCate({slug,email,name},user.token)
     .then(res=>{
         if(res.data.kq == "oke"){
             toast.success("Cap nhat thanh cong !")
             history.push("/category-admin")
             setName("")
         }
         else{
             toast.error("cap nhat khong thanh cong")
         }
     })
    }
    useEffect(()=>{
        console.log(slug);
        let {email}=user
        findCategory({email,slug},user.token)
        .then(res=>{
            console.log("find cate:",res.data);
            setName(res.data.name)
        })
    },[])
    return (
        <div className="container-fluid mt-5 container-admin">
            <div className="row">
                <Navbar></Navbar>
                <div className="col-9 sideebar-right">
                <h3 className="title-admin"><i class="fas fa-calendar-alt mr-2"></i>Trang Category</h3>
                    <h5 className="mt-3">Cập nhật Category</h5>

                    <form className="mt-4">
                      
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Nhập tên</label>
                            <div className="col-sm-10">
                                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control input-form" id="inputPassword" placeholder="nhập tên" />
                            </div>
                        </div>


                        <button onClick={btnupdate} className="btn btn-danger btn-cate">Cập nhật</button>


                    </form>

        </div>
        </div>
        </div>
    );
}

export default UpdateCategory;