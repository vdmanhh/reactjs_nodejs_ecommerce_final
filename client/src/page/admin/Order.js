import React, { useEffect, useState } from 'react';
import Navbar from '../../form/Navbar';
import { getOrderfilter, UpdateOrder } from '../../function/order';
import { useSelector } from 'react-redux'
import manhdz from '../../manhdz.PNG'
import OrderChildren from './OrderChildren';
import {toast} from 'react-toastify'
const Order = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [products, setProducts] = useState([])
    const [displays, setDisplays] = useState(false)
    const [values,setValues] = useState('')
    const getFilterOrder = (arg => {
        let { email } = user
        getOrderfilter({ arg, email }, user.token)
            .then(res => {
                setProducts(res.data)
                console.log('kqq : ',res.data);
            })
    })
    useEffect(()=>{
        let value1 = 'Đang xử lý'
        getFilterOrder(value1)
    },[])
    const btn1 = (e) => {
        e.preventDefault()
        // console.log('kqq : ',e.target.value);
        let value1 = e.target.value
        setValues(e.target.value)
        getFilterOrder(value1)
    }
    const btn2 = (e) => {

        e.preventDefault()
        let value1 = e.target.value
        setValues(e.target.value)
        getFilterOrder(value1)
    }
    const btn3 = (e) => {
        e.preventDefault()
        let value1 = e.target.value
        setValues(e.target.value)
        getFilterOrder(value1)
    }
    const btn4 = (e) => {
        e.preventDefault()
        let value1 = e.target.value
        setValues(e.target.value)
        getFilterOrder(value1)
    }
    const btn5 = (e) => {
        e.preventDefault()

        let value1 = e.target.value
        setValues(e.target.value)
        getFilterOrder(value1)
    }

    const onchangeState=(e,_id)=>{
        console.log(e.target.value,_id);
        let orderStatus = e.target.value
        let {email} = user
        UpdateOrder({email,_id,orderStatus},user.token)
        .then(res=>{
            if(res.data.kq == 'oke'){
                    toast.success('Cập nhật trạng thái đơn hàng thành công !')
                    getFilterOrder(values)
            }
            else{
                toast.error("Cập nhật không thành công")
            }
        })
    }
    return (
        <div className="container-fluid mt-5 container-admin">
            <div className="row">
                <Navbar></Navbar>
                <div className="col-9 sideebar-right colorcol9">
                    <div className='hhhhh'><h3>Trang đơn hàng</h3></div>
                    <div className='row'>
                        <div className="clasbtn">
                            <button onClick={btn1} value="Đang xử lý" className='btn btn-secondary mr-2 ml-5'><i class="fas fa-shopping-cart mr-2"></i>Đang xử lý</button>
                            <button onClick={btn2} value="Đang giao cho Đơn vị vận chuyển" className='btn btn-primary mr-2'><i class="fas fa-people-carry mr-2"></i>Đang giao cho Đơn vị vận chuyển</button>
                            <button onClick={btn3} value="Đang vận chuyển" className='btn btn-warning mr-2'><i class="fas fa-car-side mr-2"></i>Đang vận chuyển</button>
                            <button onClick={btn4} value="Đã giao hàng" className='btn btn-success mr-2'> <i class="fas fa-star mr-2"></i>Đã giao hàng</button>
                            <button onClick={btn5} value="Đơn hàng bị hủy" className='btn btn-danger mr-2'><i class="fas fa-car-crash mr-2"></i>Đơn hàng bị hủy</button>
                        </div>
                    </div>

                    {
                        products && products.length > 0 ? (
                            <>
                            {
                                products && products.length >0 && products.map((p,k)=>{
                                    return(
                                    <>
                                    <h4 className='mt-5'
                                    >Đơn số {k+1}</h4>
                                    <table className="table mt-2 ">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Tên</th>
                                            <th scope="col">Gía</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Thành tiền</th>
                                            <th scope="col">Trạng thái đơn hàng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       <OrderChildren
                                       pp={p.products}
                                       statee={p.orderStatus}
                                       ></OrderChildren>

                                    </tbody>
                                </table>
                                <div className="row pl-3">
                                    <div className="ods">
                                    <div className="ml-2 hghg">Địa chỉ  </div>
                                    <div className="ml-4"> : </div>
                                    <div className="ml-3"> {p.address}</div>
                                    </div>
                                    
                                  
                                </div>
                                <div className="row pl-3 pt-2">
                                <div className="ods">
                                    <div className="ml-2 hghg">Đã áp dụng mã giảm giá  </div>
                                    <div className="ml-4"> : </div>
                                    <div className="ml-3">  {p.discount ? p.discount : '0'}%</div>
                                    </div>
                                  
                                    
                                   
                                </div>
                                <div className="row mt-3 mb-5">
                                    <div className="col-3">
                                        <div className='btn btn-warning'>Tổng tiền : {p.totalAfterDiscount ? ((p.totalAfterDiscount).toLocaleString()):((p.cartTotal).toLocaleString())} VNĐ</div>
                                    </div>
                                    <div className='col-2 pt-2'>
                                        Thay đổi trạng thái đơn hàng :
                                    </div>
                                    <div className='col-3'>
                             
                                        <select value={p.orderStatus} onChange={e=>onchangeState(e,p._id)} className="form-control" id="exampleFormControlSelect1">
                                            <option value="Đang xử lý">Đang xử lý</option>
                                            <option value="Đang giao cho Đơn vị vận chuyển">Đang giao cho Đơn vị vận chuyển</option>
                                            <option value="Đang vận chuyển">Đang vận chuyển</option>
                                            <option value="Đã giao hàng">Đã giao hàng</option>
                                            <option value="Đơn hàng bị hủy">Đơn hàng bị hủy</option>
                                        </select>

                                    </div>
                                    
                                </div>
                                <hr></hr>
                                </>
                                )
                                })
                            }
                               
                            </>
                        ) : (
                            <div className=" backback">
                                <div className='falil hhfgf'>
                                    <img className="imgerror anhmanhorder" src={manhdz}></img>
                                    <h5>Không có đơn hàng nào được tìm thấy</h5>
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    );
}

export default Order;