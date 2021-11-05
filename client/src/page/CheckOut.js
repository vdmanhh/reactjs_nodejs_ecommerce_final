import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { createOrder, emptyCart, getCartUser } from '../function/cart';
import { Editor } from 'react-editor'
import { Input } from 'antd';
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom'
import { applyCoupon, saveAddressUser } from '../function/User';
// import parse  from 'html-react-parser'; //<h1>haha</h1> => 'hahaha'

const CheckOut = ({ }) => {
    const { TextArea } = Input;
    const history = useHistory()
    const { user,cart } = useSelector((state) => ({ ...state }))
    const [total, setTotal] = useState('')
    const [product, setProduct] = useState([])
    const [address, setAddress] = useState("")
    const [coupon, setCoupon] = useState('')
    const [afterDiscount, setAfterDiscount] = useState('')
    const [openCheck,setOpenCheck]=useState(false)
    const [discountError, setDiscountError] = useState(false)
    const [note,setNote] = useState(false)
    const [money, setMoney] = useState('')
    useEffect(() => {
      
        let email = user.email
        getCartUser({ email }, user.token)
            .then(res => {
                if(res.data.kq == 'false'){
                    history.push('/gio-hang')
                }
                else{
                    setTotal(res.data.cartTotal)
                    setProduct(res.data.products)
                }
                // console.log('carttt:', res.data.products);
                
            })
       
    }, [])
    const saveAdd = () => {
        if(cart.lenght<0){
            toast.error("Bạn cần thêm sản phẩm vào giỏ hàng để đặt hàng !")
        }
       else{
        let {email} = user
        console.log(address);
        saveAddressUser({email,address},user.token)
        .then(res=>{
            if(res.data.kq =='oke'){
                toast.success('Lưu địa chỉ thành công, bạn có thể áp dụng mã giảm giá hoặc hoàn thành đặt hàng !')
                console.log('luu thanh cong');
                setOpenCheck(true)
                setAddress('')
            }
            else{
                console.log('luu ko thanh cong');
                setOpenCheck(false)
            }
        })
       }
    }
    

    const appCoupon = (e) => {
        console.log(coupon);
        let {email} = user
        applyCoupon({email,coupon},user.token)
        .then(res=>{
            if(res.data.kq){
                setDiscountError(true)
                setCoupon('')
                console.log('ma giam gia ko ton tai');
            }
            else{
                console.log("after discount : ",res.data);
                setAfterDiscount(res.data.totalAfterDiscount.toLocaleString())
                setNote(true)
                setCoupon('')
                setMoney(res.data.discount)
                setDiscountError(false)
            }
        })
    }
        const btnEmpty=(e)=>{
                e.preventDefault()
               if(window.confirm('Ban co chac muon xoa hoa don nay khong ?')){
                let {email} = user
                emptyCart({email},user.token)
                .then(res=>{
                    if(res.data.kq == 'oke'){
                        toast.success('Xóa đơn hàng thành công !')
                        setNote(false)
                        setAfterDiscount('')
                        setProduct([])
                        setDiscountError(false)
                        setTotal('')
                        setOpenCheck(false)
                        setAddress('')
                        history.push('/gio-hang')
                    }
                })
               }
            }
        const btnSuccess=()=>{
            let {email} = user
            createOrder({email},user.token)
            .then(res=>{
                if(res.data.kq =='oke'){
                    history.push('/payment-success')
                }
            })
            history.push('/payment-success')
        }
    return (
        <div className="container containercha">
            <div className='row '>
                <div className='col-7 colpayment'>
                    <h3 className='titlepayment pt-4'>Thông tin khách hàng</h3>
                    <hr></hr>
                    <p className='mt-5 adrress'>1. Nhập địa chỉ</p>
                    <TextArea
                    className=''
                        value={address}
                        onChange={e=>{setAddress(e.target.value);setOpenCheck(false)}}
                        placeholder="Nhập địa chỉ giao hàng và lời nhắn cho người bán nếu có..."
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                   
                    <button onClick={saveAdd} disabled={!address} className='btn btn-danger mt-2 btncustom1'><i class="fas fa-share-square mr-2"></i>Lưu địa chỉ</button>

                    <p className='mt-5 adrress'>2.Nhập mã giảm giá (nếu có)</p>
                    <TextArea
                        className=''
                        value={coupon}
                        onChange={e=>{setCoupon(e.target.value);
                            setDiscountError(false)
                            setNote(false)
                        }}
                        placeholder="Nhập mã giảm giá để nhận thêm nhiều ưu đãi mới nhất ( nếu có )..."
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />

                    <button onClick={appCoupon} disabled={!coupon} className='btn btn-danger mt-2 btncustom mb-5'><i class="fas fa-share-square mr-2"></i>Áp dụng mã giảm giá</button>


                    {
                        discountError && (<div className="eror">
                            Mã giảm giá của bạn đã hết hạn hoặc không chính xác !!
                        </div>) 
                    }

                    {
                        note && (<div className="eror erorr mb-5">Chúc mừng bạn đã áp dụng mã giảm giá giảm {money}% cho sản phẩm thành công !!</div>)
                    }

                </div>
                <div className='col-5 colpayment'>
                    <h3 className='titlepayment pt-4'>Thông tin sản phẩm</h3>
                    <hr></hr>
                    <p className='csscsss pt-2'>Tổng sản phẩm : {product.length}</p>
                    {product && product.length > 0 && product.map((p, k) => {
                        return (
                            <div className='ttsp '>
                                <p className='chas'>{k + 1}. </p>
                                <p className='pr-2 pl-1 chas'>{p.product.name} </p>
                                <p className='pr-2 coloor chas'>x {p.count}</p>
                                <p className='chas'>= {(p.count * p.product.price).toLocaleString()} VNĐ</p>
                            </div>
                        )
                    })}
                    <hr></hr>
                    <h5>Tổng tiền : {total.toLocaleString()} VNĐ</h5>
                    <hr></hr>

                    {note ? (<> <div>
                        <h5 className='afterdiscount'>Tổng tiền sau giảm giá : {afterDiscount} VNĐ</h5>
                    </div> <hr></hr></>):''}
                    

                    <div>
                        <button onClick={btnSuccess} disabled={!openCheck} className='btn btn-outline-danger mb-5 mt-5'><i class="fas fa-broadcast-tower mr-2"></i>Hoàn thành đặt hàng</button>
                        <button onClick={btnEmpty} className='btn btn-danger btnxoaa mb-5 mt-5 ml-2'><i class="far fa-trash-alt mr-2"></i>Xóa hóa đơn</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;