import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Navbar from '../../form/Navbar';
import UpaloadImage from '../../form/UpaloadImage';
import { findSub, updateSub } from '../../function/sub';
import { findcateforsub, getAllCate } from '../../function/category';

import {toast} from "react-toastify"
const UpdateSubCategory=()=> {
    const history = useHistory()
    const {user} = useSelector((state)=>({...state}))
    const [loading,setLoading] = useState(false)
    const [imagess,setImagess]  = useState([])
    const [name,setName] = useState('')
    const {slug} = useParams()
    const [parentt,setParentt]=useState("")
    const [parent,setParent]=useState("")
    const [allcategory,setAllcategory]= useState([])
    const onChangeCate=(e)=>{
        setParent(e.target.value)
      
    }
    const getAlllCate=()=>{
        let { email } = user
        getAllCate({ email }, user.token)
            .then(res => {
                setAllcategory(res.data)
            })
    }
    useEffect(()=>{
        
        getAlllCate();
        
        let email = user.email
        findSub({slug,email},user.token)
        .then(res=>{
            setName(res.data.subb.name)
            setImagess(res.data.subb.image)
           
            const parent= res.data.subb.parent
            findcateforsub({email,parent},user.token)
            .then(ress=>{
                setParentt(ress.data)
            
            })
        })
    },[])

    const btnUpdate=(e)=>{

        e.preventDefault()
        let {email}=user
        if(parent==""){
        
            updateSub({slug,name,imagess,email,parentt},user.token)
            .then(res=>{
                if(res.data.kq=="oke"){
                    toast.success("cap nhat thanh cong")
                    history.push("/sub-category-admin")
                }
                else{
                    toast.error("cap nhat khong thanh cong")
                }

            })
        }
        else{
         
            updateSub({slug,name,imagess,email,parent},user.token)
            .then(res=>{
                if(res.data.kq=="oke"){
                    toast.success("cap nhat thanh cong")
                    history.push("/sub-category-admin")
                }
                else{
                    toast.error("cap nhat khong thanh cong")
                }

            })
        }
    }
    return (
        <div className="container-fluid mt-5 container-admin mb-5">
            <div className="row mb-5">
                <Navbar></Navbar>
                <div className="col-9 sideebar-right">
                    <h3 className="title-admin"><i class="fas fa-calendar-alt mr-2"></i>Trang SubCategory</h3>
                    {loading ? <h3>Loading...</h3>:(<h5 className="mt-3">Tạo SubCategory</h5>)}

                    <form className="mt-4 mb-5">
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-1 col-form-label">Chọn ảnh</label>
                            <UpaloadImage
                            imagess={imagess}
                            setLoading={setLoading}
                            setImagess={setImagess}
                            ></UpaloadImage>
                        </div>

                        <div className="form-group row mb-4">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Chọn Category</label>

                            <select onChange={(e)=>onChangeCate(e)} className="custom-select input-form selectorr">
                             <option value={parentt._id}>{parentt.name}</option>
                                {allcategory && allcategory.map((c, k) => {
                                    return (
                                        <option key={k} value={c._id}>{c.name}</option>
                                    )
                                })}


                            </select>

                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Nhập tên Sub</label>
                            <div className="col-sm-10">
                                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control input-form" id="inputPassword" placeholder="nhập tên" />
                            </div>
                        </div>


                        <button  onClick={btnUpdate} className="btn btn-danger btn-cate">Câp nhật</button>


                    </form>

                  

                   

                </div>
            </div>
        </div>
    );
}

export default UpdateSubCategory;