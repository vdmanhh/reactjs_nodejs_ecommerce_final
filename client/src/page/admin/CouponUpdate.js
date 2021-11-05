import React, { useEffect, useState } from 'react';
import { Link, useParams,useHistory } from 'react-router-dom';
import Navbar from '../../form/Navbar';
import {useSelector} from 'react-redux'
import DatePicker from "react-datepicker";
import {toast} from 'react-toastify'
import "react-datepicker/dist/react-datepicker.css";
import { findCoupon, updateCoupon } from '../../function/coupon';
const CouponUpdate=()=> {
    const [name, setName] = useState('')
    const history = useHistory()
    const [expiry, setExpiry] = useState()
    const [discount,setDiscount] = useState('')
    const {user} = useSelector((state)=>({...state}))
    const [couponn,setCouponn] = useState('')
    const {_id} = useParams()
    useEffect(()=>{
        let {email} = user
           findCoupon({email,_id},user.token)
           .then(res=>{
               console.log(res.data);
            setDiscount(res.data.discount)
             setName(res.data.name)
            setExpiry(res.data.expiry)
           })
    },[])

   
    const btnCreate=(e)=>{
        e.preventDefault()
        console.log(expiry,name,discount);
        let {email} = user
        updateCoupon({email,name,expiry,discount,_id},user.token)
        .then(res=>{
            if(res.data.kq=='oke'){
                toast.success("cập nhật thành công")
                history.push('/coupon-admin')
            }
            else{
                toast.error("cập nhật không thành công")
            }
        })
        
    }
 
    return (
        <div className="container-fluid mt-5 container-admin">
        <div className="row">
            <Navbar></Navbar>
            <div className="col-9 sideebar-right">
                <h3 className="title-admin"><i class="fas fa-calendar-alt mr-2"></i>Trang Cập nhật mã giảm giá</h3>
                <h5 className="mt-3">Cập nhật mã giảm giá</h5>

                <form className="mt-4">
                   
                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Nhập tên</label>
                        <div className="col-sm-10">
                            <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control input-form" id="inputPassword" placeholder="nhập tên" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Ngày hết hạn</label>
                        <div className="col-sm-10">
                        <DatePicker className="note"value={expiry} selected={new Date()} onChange={(date) => setExpiry(date)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Nhập ưu đãi</label>
                        <div className="col-sm-10">
                            <input value={discount} onChange={e => setDiscount(e.target.value)} type="number" className="form-control input-form" id="inputPassword" placeholder="nhập phàn trăm ưu đãi" />
                        </div>
                    </div>
                    {/* <DatePicker className="note" selected={expiry} onChange={(date) => setExpiry(date)} /> */}


                    <button disabled={!name || !discount || !expiry} onClick={btnCreate} className=" mb-5 btn btn-danger btn-cate">Cập nhật</button>


                </form>

              

              

            


            </div>
        </div>
    </div>
    );
}

export default CouponUpdate;