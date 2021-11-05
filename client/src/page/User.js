import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import UserHistoryTbody from '../compoment/UserHistoryTbody';
import { getOrder } from '../function/order';
import manhdz from '../manhdz.PNG'
import { Document, Page, Text, View, StyleSheet,PDFDownloadLink } from '@react-pdf/renderer'
import InvoicePDF from '../compoment/InvoicePDF';
import NavBarUser from './user/NavBarUser';
const User = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [order, setOrder] = useState([])
    const [statee, setStatee] = useState(false)
    const [products, setProducts] = useState([])
    const [add, setAdd] = useState('')
    const [totalAfterDiscount, setTotalAfterDiscount] = useState('')

    const [cartTotal, setCartTotal] = useState('')
    useEffect(() => {
        if (!user) {
            setStatee(true)
        }
        else {
            let { email } = user;
            getOrder({ email }, user.token)
                .then(res => {
                    console.log(res.data);
                    setOrder(res.data)
                    setProducts(res.data.products)
                    setAdd(res.data.orderBy)
                    setCartTotal(res.data.cartTotal)
                    setTotalAfterDiscount(res.data.totalAfterDiscount)
                })
        }
    }, [])

    const showDownloadLink = (p) => (
        <PDFDownloadLink
          document={<InvoicePDF order={p}></InvoicePDF>}
          fileName="invoice.pdf"
          className="btn btn-outline-danger wait btnPdf"
        >
         <i class="fas fa-download mr-2"></i> Tải PDF
        </PDFDownloadLink>
      );
    return (
        <div className="container mb-5 ">
            <div className='row mt-5 owcha'>
              <NavBarUser user={user}></NavBarUser>

                {
                    statee ? (<div className="col-8 backback">
                                <div className='falil'>
                                    <img className="imgerror" src={manhdz}></img>
                                    <h5>Bạn phải đăng nhập thì mới xem được lịch sử mua hàng</h5>
                                </div>
                        </div>) : (
                        <div className='col-8 coloclo'>
                             <div className='mt-3' ><h3 className='cuctt'>Đơn hàng của bạn</h3></div>
                            {
                                order && order.length > 0 && order.map((p, k) => {
                                    return (
                                        <>
                                            <h4 className='mt-5 vbvv'>Đơn số {k+1}</h4>
                                            <table className="table mt-2">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col">STT</th>
                                                        <th scope="col">Tên</th>
                                                        <th scope="col">Giá</th>
                                                        <th scope="col">Số lượng</th>
                                                        <th scope="col">Thành tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <UserHistoryTbody product={p.products} ></UserHistoryTbody>

                                                </tbody>
                                            </table>
                                            <div className='row ml-2 mb-2'>  Địa chỉ giao hàng : {p.address}  </div>
                                            <div className='row ml-2 mb-2'>  Đã giảm giá : {p.discount? p.discount : '0'}%</div>
                                            <div className='row ml-2 mb-2'>  Ngày mua : {p.createdAt}</div>
                                            <div className='row'>
                                                <div className='col-3'>
                                                        {showDownloadLink(p)}
                                                    {/* <button onClick={btnPDF} className='btn btn-outline-danger wait'><i class="fas fa-download mr-2"></i>Tải PDF</button> */}
                                                </div>
                                                <div className='col-5'>
                                                 
                                                        <button className='btn btn-outline-danger wait '><i class="fas fa-car-side mr-2"></i>Trạng thái :  {p.orderStatus}</button>
                                               
                                                </div>
                                                <div className='col-4 '>
                                                    <button className='btn btn-outline-danger wait'><i class="fas fa-book-open mr-2"></i>Tổng :
                                                      {p.totalAfterDiscount ?((p.totalAfterDiscount).toLocaleString()) : ((p.cartTotal).toLocaleString()) } VNĐ</button>
                                                </div>
                                            </div>
                                            <hr className='mt-5'></hr>
                                        </>
                                    )
                                })
                            }

                        </div>
                    )
                }


            </div>
        </div>
    );
}

export default User;