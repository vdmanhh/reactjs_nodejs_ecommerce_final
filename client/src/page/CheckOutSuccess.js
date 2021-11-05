import React,{useEffect,useState} from 'react';
import Capture from '../Capture.PNG'
import {useSelector} from 'react-redux'
import { getCartUserPayment } from '../function/cart';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router';
const CheckOutSuccess = () => {
    const history = useHistory()
    const {user} =useSelector((state)=>({...state}))
    const [priceDiscount,setPriceDiscount] = useState('')
    const [cartUser, setCartUser] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [products,setProducts]=useState([])
    const [username,setUsername] = useState('')
    useEffect(() => {
            let {email} = user
            getCartUserPayment({email},user.token)
            .then(res=>{
              if(res.data.kq == "false"){
               history.push('/gio-hang')
              }
              else if(!res.data.kq) {
                console.log('kq : ',res.data);
                setCartUser(res.data)
                setUsername(res.data.orderBy)
                setProducts(res.data.products)
                if(res.data.totalAfterDiscount){
                    setPriceDiscount(res.data.totalAfterDiscount)
                }
                else{
                    setTotalPrice(res.data.cartTotal)
                }
              }
            })
    }, [])
    // .toLocaleString()
    const btnGo=(e)=>{
        e.preventDefault()
        console.log('1 ===',products);
    }
    return (
        <div className="container backcolorc mt-5">
            <div className="row">
                <div className="col-3" />
                <div className="col-6">
                    <img className="imgsuccess mt-5" src={Capture} alt="" />
                    <h2 className="titlesuccess">Đặt đơn hàng thành công</h2>
                    <h3 className="pricesuccess">{priceDiscount ? priceDiscount.toLocaleString() : totalPrice.toLocaleString() } VNĐ</h3>
                    <hr />
                    <div className="roww">
                        <div className="col-4">
                            <p className>Tên khách hàng</p>
                        </div>
                        <div className="col-8">
                            <p className="namesuccess">{username.name}</p>
                        </div>
                    </div>
                    <div className="roww">
                        <div className="col-4">
                            <p className>Địa chỉ</p>
                        </div>
                        <div className="col-8">
                            <p className="namesuccess">{username.address}</p>
                        </div>
                    </div>
                    <div className="roww">
                        <div className="col-4">
                            <p className>Ngày mua</p>
                        </div>
                        <div className="col-8">
                            <p className="namesuccess">{cartUser.createdAt ?cartUser.createdAt:''}</p>
                        </div>
                    </div>
                  
                    <div className="roww">
                        <div className="col-4">
                            <p className>Sản phẩm</p>
                        </div>
                        <div className="col-8">
                            <div className="namesuccess">
                                {products &&products.length>0 && products.map((p,k)=>{
                                    return(
                                        <span className="chitiespp">
                                        <p className>{k+1}.</p>
                                        <p className='pl-1 pr-2'>{p.product.name}</p>
                                        <p className>( x {p.count})</p>
                                        </span>
                                    )
                                })}
                               
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="mt-3  btnsuce">
                        <Link to={'/'}><button  className="btn btn-outline-danger btnmuaam mr-2"><i className="fas fa-shopping-cart mr-2" />Tiếp tục mua sắm</button></Link>
                        <Link to={'/lich-su'}><button className="btn btn-danger btnmuaam"><i className="fas fa-book-reader mr-2" />Đi tới lịch sử mua sắm</button></Link>
                    </div>
                </div>
                <div className="col-3" />
            </div>
        </div>

    );
}

export default CheckOutSuccess;