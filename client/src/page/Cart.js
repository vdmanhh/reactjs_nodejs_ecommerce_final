import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import CartDetail from '../form/CartDetail';
import { UserCart } from '../function/User';
import image from '../image.PNG'
const Cart = ({ }) => {
    const { cart, user } = useSelector((state) => ({ ...state }))
    const history=useHistory()
    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
    const displayCart = () => {
        return (
            <table className="table tablecart">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Ship</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                {cart && cart.length > 0 && cart.map((c, k) => {
                    return (
                        <CartDetail
                            c={c}
                            k={k}
                            key={c._id}
                        ></CartDetail>
                    )
                })}

            </table>

        )
    }
    const btnloginToCart=()=>{
            history.push({
                pathname: "/login",
                state: { from: "/gio-hang" }
            })
    }
    const btnPayment = ()=>{
        // history.push('/user-payment')
        let email = user.email
        UserCart({cart,email},user.token)
        .then(res=>{
            console.log(res.data.ok=="oke");
            if(res.data.ok){
                history.push('/thanh-toan')
            }
        })
        .catch(err=>{
            console.log("chua luu dc cart");
        })
    }
    return (
        <div className="container-fluid mt-5">
            <div className='row rowcart'>
                <div className='col-8 mt-5'>{cart && cart.length > 0 ? <>{displayCart()}</> :
                    (<div className='imgchaa'>
                        <img className="imggiohang" src={image} ></img>
                        <div>
                            <h4 className="ohnoo">Oh nooo !</h4>
                        <h5 className="titlecarttt">Không có sản phẩm nào trong giỏ hàng của bạn, tiếp tục mua sắm nhiều sản phẩm mới nhất tại<Link className="pl-2 paddingg" to={'/cua-hang'}>Cửa Hàng Món Ngon !</Link></h5>
                        </div>
                        </div>)}
                </div>
                <div className='col-4 mt-5 bordersd'>
                    <div className="titlehoadon"><h4 className="titlehoadon1">HÓA ĐƠN THANH TOÁN </h4></div>
                    <hr />
                    <p className='csscsss'>Tổng sản phẩm : {cart && cart.length} </p>
                    {cart && cart.length&&cart.map((p, i) => {
                        return (
                            <div className="mt-2 mb-2 chas"> {i + 1} . {p.name} <p className='pl-2 mr-2 countcart'>x {p.count}</p> = $ {(p.price * p.count).toLocaleString()}</div>
                        )
                    })}
                    <hr />
                    <div className="pb-5 chas">
                        Thành tiền : <b className='pl-2'>{getTotal().toLocaleString()} VNĐ</b>
                    </div>

                    {
                        user&&user.token ? (<button disabled={cart.length<1} onClick={btnPayment} className="btn btn-outline-danger mb-5"><i class="fas fa-car-side mr-2"></i>Thanh toán</button>):
                        (<button onClick={btnloginToCart} className="btn btn-outline-danger mb-5"><i class="fas fa-sign-in-alt mr-2"></i>Đăng nhập để thanh toán</button>)
                    }

                </div>
            </div>

        </div>
    );
}

export default Cart;