import React, { useEffect, useState } from 'react';
import Navbar from '../../form/Navbar';
import { Link } from 'react-router-dom';
import { getAllCate } from '../../function/category';
import { useSelector } from 'react-redux'
import { CreateSub, deletelSub, getAllSub } from '../../function/sub';
import { toast } from 'react-toastify';
import UpaloadImage from '../../form/UpaloadImage';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const SubCategory = () => {
    const [key, setKey] = useState("")
    const [imagess,setImagess] = useState([])
    const [name, setName] = useState("")
    const [subcategory, setSubcategory] = useState([])
    const [allcategory, setAllcategory] = useState([])
    const { user } = useSelector((state) => ({ ...state }))
    const [parent, setParent] = useState("")
    const [loading,setLoading] = useState(false)
    const getAllSubs = () => {
        let { email } = user
        getAllSub({ email }, user.token)
            .then(res => {
                setSubcategory(res.data)
            })
    }

    useEffect(() => {
        getAllSubs();
        let { email } = user
        getAllCate({ email }, user.token)
            .then(res => {
                setAllcategory(res.data)
            })
    }, [])
    const btnCreate = (e) => {
        e.preventDefault();

            // console.log("setImagess : ", imagess);

        let { email } = user

        CreateSub({ parent, email, name,imagess }, user.token)
            .then(res => {
                if (res.data.kq == "oke") {
                    setName("")
                    setImagess([])
                    getAllSubs();
                    toast.success("Tao category thanh cong")
                }
                else {
                    toast.error("tao categoy ko thanh cong")
                }
            })
            .catch(err => {
                toast.error("tao categoy ko thanh cong")
            })
    }


    const timkiem = (e) => {
        setKey(e.target.value.toLowerCase())
    }


    const deletee = (slug) => {

        if (window.confirm("Ban co chac muon xoa ko?")) {
            let { email } = user
            deletelSub({ slug, email }, user.token)
                .then(res => {
                    if (res.data.kq == "oke") {
                        toast.success("xoa thanh cong")
                        getAllSubs();
                    }
                    else {
                        toast.error("xoa ko thanh cong")
                    }
                })
        }
    }


    const fileterr = (key) => C => C.name.toLowerCase().includes(key)


    const onChangeCate = (e) => {
        setParent(e.target.value)
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <div className="container-fluid mt-5 container-admin">
            <div className="row">
                <Navbar></Navbar>
                <div className="col-9 sideebar-right">
                    <h3 className="title-admin"><i class="fas fa-calendar-alt mr-2"></i>Trang SubCategory</h3>
                    {loading ? <h3>Loading <Spin indicator={antIcon} /></h3>:(<h5 className="mt-3">Tạo SubCategory</h5>)}

                    <form className="mt-4">
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

                            <select onChange={onChangeCate} className="custom-select input-form selectorr">
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


                        <button disabled={!name || !imagess || !parent} onClick={btnCreate} className="btn btn-danger btn-cate">Tạo</button>


                    </form>

                    <form className="mt-5">
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Tìm kiếm </label>
                            <div className="col-sm-10">
                                <input onChange={(e) => timkiem(e)} type="text" className="form-control input-form" id="inputPassword" placeholder="Nhập tên category cần tìm" />
                            </div>
                        </div>
                    </form>

                    <div className="row mt-5">
                        <div className="col-3"></div>
                        <div className="col-6 danhsach"><h5 className="danhsachh">Danh sách SubCategory</h5></div>
                        <div className="col-3"></div>
                    </div>

                    <table className="table table-cate mt-5">
                        <thead className="thead-light">
                            <tr class="table-catee">
                                <th scope="col class1">STT</th>
                                <th scope="col class2">Ảnh</th>
                                <th  scope="col class3 ">Tên</th>
                                <th scope="col class3"></th>
                                <th  scope="col class3 ">Thao tác</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                subcategory && subcategory.filter(fileterr(key)).map((c, k) => {
                                    return (
                                        <tr key={k}>
                                            <th className="pt-5" scope="row">{k + 1}</th>
                                            <td><img className="imgimg" src={c.image&&c.image.length>0 ? c.image[0].url : ""}></img></td>
                                            <td className="pt-5">{c.name}</td>
                                            <td></td>
                                            <td className="pt-5"><btn onClick={() => deletee(c.slug)} class="btn btn-danger mr-2 btndelete">Xóa</btn><btn class="btn btn-success "><Link className="capnhatbtn" to={`/update-sub-category-admin/${c.slug}`}>Cập nhật</Link></btn></td>
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

export default SubCategory;