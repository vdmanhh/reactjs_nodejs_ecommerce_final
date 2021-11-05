import React, { useEffect, useState } from 'react';
import Navbar from '../../form/Navbar';
import { Link } from 'react-router-dom';
import { createCategory, deleteCategory, getAllCate } from '../../function/category';
import {toast} from "react-toastify"
import {useSelector} from 'react-redux'

const Category=()=> {
    const {user} = useSelector((state)=>({...state}))
    const [name, setName] = useState('')
    const [loading,setLoading] = useState(false)
    const [category, setCategory] = useState([])
    const [key,setKey] = useState('')
    const deletee = (slug) => {
       if(window.confirm("ban co chac muon xoa khong ?")){
        let {email} = user
        // console.log(a);
        deleteCategory({slug,email},user.token)
        .then(res=>{
            if(res.data.kq == "oke"){
                toast.success("xoa thanh cong!")
                getAllcatee();
            }
            else{
                toast.error("xoa khong thanh cong")
            }
        })
       }
    }
    useEffect(() => {
        getAllcatee();
    }, [])
    const getAllcatee = () => {
        const email = user.email
        getAllCate({email},user.token)
            .then(res => {
                setCategory(res.data)
            })
    }
    const btnCreate = (e) => {
        e.preventDefault()
        setLoading(true)
        let email = user.email
        createCategory({email,name},user.token)
        .then(res=>{
            if(res.data.kq =="oke"){
                toast.success("Bạn đã tạo Category thành công")
                getAllcatee();
                setName("")
                console.log(key);
            }
            else{
                toast.error("Tạo không thành công");
            }
        })
    }
    const timkiem=(e)=>{
      
        setKey(e.target.value.toLowerCase())
    }
    const fileterr =(key)=> (C)=>C.name.toLowerCase().includes(key)
    return (


        <div className="container-fluid mt-5 container-admin">
            <div className="row">
                <Navbar></Navbar>
                <div className="col-9 sideebar-right">
                    <h3 className="title-admin"><i class="fas fa-calendar-alt mr-2"></i>Trang Category</h3>
                    <h5 className="mt-3">Tạo Category</h5>

                    <form className="mt-4">
                        {/* <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Chọn ảnh</label>

                        </div> */}
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Nhập tên</label>
                            <div className="col-sm-10">
                                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control input-form" id="inputPassword" placeholder="nhập tên" />
                            </div>
                        </div>


                        <button disabled={!name} onClick={btnCreate} className="btn btn-danger btn-cate">Tạo</button>


                    </form>

                    <form className="mt-5">
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Tìm kiếm </label>
                            <div className="col-sm-10">
                                <input onChange={(e)=>timkiem(e)} type="text" className="form-control input-form" id="inputPassword" placeholder="Nhập tên category cần tìm" />
                            </div>
                        </div>
                    </form>

                    <div className="row mt-5">
                        <div className="col-3"></div>
                        <div className="col-6 danhsach"><h4 className="danhsachh">Danh sách Category</h4></div>
                        <div className="col-3"></div>
                    </div>

                    <table className="table table-cate mt-5">
                        <thead className="thead-light">
                            <tr class="table-catee">
                                <th scope="col class1">STT</th>
                                <th scope="col class2">Tên</th>
                                <th scope="col class3">Admin</th>
                                <th scope="col class3"></th>
                                <th scope="col class3">Thao tác</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                category && category.filter(fileterr(key)).map((c, k) => {
                                    return (
                                        <tr key={k}>
                                            <th scope="row">{k+1}</th>
                                            <td>{c.name}</td>
                                            <td>{user.email}</td>
                                            <td></td>
                                            <td><btn onClick={()=>deletee(c.slug)} class="btn btn-danger mr-2 btndelete">Xóa</btn><btn class="btn btn-success "><Link className="capnhatbtn" to={`/category-update-admin/${c.slug}`}>Cập nhật</Link></btn></td>
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

export default Category;