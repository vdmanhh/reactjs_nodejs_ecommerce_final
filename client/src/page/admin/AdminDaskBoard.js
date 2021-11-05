import React, { useEffect, useState } from 'react';
import Navbar from '../../form/Navbar';
import { Link } from 'react-router-dom';
import { createCategory, deleteCategory, getAllCate } from '../../function/category';
import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import { getProductCount, getProductss } from '../../function/product';
import CartProduct from '../../form/CartProduct';
import { Pagination } from 'antd'
import TestCartProduct from '../../form/TestCartProduct';
const AdminDaskBoard = () => {
    const [key, setKey] = useState('')
    const [page, setPage] = useState(1)
    const [product, setProduct] = useState([])
    const [productCount, setProductCount] = useState(0)
    useEffect(() => {

        getProductCount()
            .then(res => {

                setProductCount(res.data);
            })
    }, [])
    useEffect(() => {
        getAllProducts();

    }, [page])

    const getAllProducts = () => {
        let sort = 'createdAt'
        let order = 'desc'
        getProductss({ page, sort, order })
            .then(res => {
                setProduct(res.data)

            })
    }
    const timkiem = (e) => {

        setKey(e.target.value.toLowerCase())
    }
    const searchh = (key) => P => P.name.toLowerCase().includes(key)
    return (


        <div className="container-fluid mt-5 container-admin">
            <div className="row">
                <Navbar></Navbar>
                <div className="col-9 sideebar-right">
                    <h3 className="title-admin"><i class="fas fa-calendar-alt mr-2"></i>Trang DashBoard</h3>

                    <form className="mt-5 ml-3">
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Tìm kiếm </label>
                            <div className="col-sm-10">
                                <input onChange={(e) => timkiem(e)} type="text" className="form-control input-form" id="inputPassword" placeholder="Nhập tên sản phẩm cần tìm" />
                            </div>
                        </div>
                    </form>
                    <div className="row">

                        {
                            product && product.length > 0 && product.filter(searchh(key)).map((p, k) => {
                                return (

                                    <TestCartProduct
                                           getAllProducts={getAllProducts}
                                        product={p}
                                    >

                                    </TestCartProduct>

                                    // <CartProduct
                                    //     getAllProducts={getAllProducts}
                                    //     product={p}
                                    // ></CartProduct>
                                )
                            })
                        }


                    </div>

                    <Pagination className="text-center mt-5 mb-5" current={page} total={(productCount / 8) * 10} onChange={value => setPage(value)}></Pagination>




                </div>
            </div>
        </div>
    );
}

export default AdminDaskBoard;