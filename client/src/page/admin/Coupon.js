import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../form/Navbar';
import {useSelector} from 'react-redux'
import DatePicker from "react-datepicker";
import {toast} from 'react-toastify'
import "react-datepicker/dist/react-datepicker.css";
import { createCoupon, deleteCoupon, getCoupon } from '../../function/coupon';
const Coupon=()=> {
    const [name, setName] = useState('')
    const [key, setKey] = useState('')
    // const [expiry, setExpiry] = useState(new Date())
    const [expiry, setExpiry] = useState('')
    const [couponAll, setCouponAll] = useState([])
    const [discount,setDiscount] = useState('')
    const {user} = useSelector((state)=>({...state}))
    
    useEffect(()=>{
            getAllCouponn()
    },[])

    const getAllCouponn=()=>{
        let {email} = user
        getCoupon({email},user.token)
        .then(res=>{
            setCouponAll(res.data)
            console.log(res.data);
        }
        )
    }
    const timkiem=(e)=>{

    }
    const btnCreate=(e)=>{
        e.preventDefault()
        if(name.length <6 || name.length>12){
            toast.error('Tên phải lớn hơn 6 ký tự và nhỏ hơn 12 ký tự')
            return
        }
        // console.log(expiry,name,discount);
        let {email} = user
        createCoupon({email,expiry,name,discount},user.token)
        .then(res=>{
            if(res.data.kq=='oke'){
                toast.success("Tạo coupon thành công")
                setDiscount('')
                setName('')
                setExpiry('')
                getAllCouponn()
            }
            else{
                toast.error('tạo không thành công')
            }
        })
    }
    const deletee=(_id)=>{
       if(window.confirm('Bạn có chắc muốn xóa không ?')){
        let {email} = user
        deleteCoupon({email,_id},user.token)
        .then(res=>{
            if(res.data.kq=='oke'){
                toast.success("Xóa thành công")
                getAllCouponn()
            }
            else{
                toast.error('Xóa không thành công')
            }
        })
       }
    }
    const fileterr=(key)=>C=>C.name.toLowerCase().includes(key)
    return (
        <div className="container-fluid mt-5 container-admin">
        <div className="row">
            <Navbar></Navbar>
            <div className="col-9 sideebar-right">
                <h3 className="title-admin"><i class="fas fa-calendar-alt mr-2"></i>Trang Coupon</h3>
                <h5 className="mt-3">Tạo Coupon</h5>

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


                    <button disabled={!name || !discount || !expiry} onClick={btnCreate} className="btn btn-danger btn-cate">Tạo</button>


                </form>

                <form className="mt-5">
                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Tìm kiếm </label>
                        <div className="col-sm-10">
                            <input onChange={(e)=>setKey(e.target.value.toLowerCase())} type="text" className="form-control input-form" id="inputPassword" placeholder="Nhập tên coupon cần tìm" />
                        </div>
                    </div>
                </form>

                <div className="row mt-5">
                    <div className="col-3"></div>
                    <div className="col-6 danhsach"><h4 className="danhsachh">Danh sách Coupon</h4></div>
                    <div className="col-3"></div>
                </div>

                <table className="table table-cate mt-5">
                    <thead className="thead-light">
                        <tr class="table-catee">
                            <th scope="col class1">STT</th>
                            <th scope="col class2">Tên</th>
                            <th scope="col class3">Ngày hết hạn</th>
                            <th scope="col class3">Ưu đãi</th>
                            <th scope="col class3">Thao tác</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            couponAll && couponAll.filter(fileterr(key)).map((c, k) => {
                                return (
                                    <tr key={k}>
                                        <th scope="row">{k+1}</th>
                                        <td>{c.name}</td>
                                        <td>{c.expiry}</td>
                                        <td>{c.discount} %</td>
                                        <td><btn onClick={()=>deletee(c._id)} class="btn btn-danger mr-2 btndelete">Xóa</btn><btn class="btn btn-success "><Link className="capnhatbtn" to={`/coupon-update-admin/${c._id}`}>Cập nhật</Link></btn></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>


            </div>
        </div>
    </div>
    );
}

export default Coupon;