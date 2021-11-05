import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import _ from "lodash";
import {useDispatch} from 'react-redux'
import { showAverage } from '../compoment/showAverage';
const CartProductUser = ({ product }) => {
    const { name, price, description, discount, states, address, images,slug } = product
    const [tooltip, setTooltip] = useState("Thêm giỏ hàng")
     const dispatch = useDispatch()
    const btnAddtocart=()=>{
        let cart = []
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                ...product,
                count : 1
            })
            let unique = _.uniqWith(cart, _.isEqual);
            localStorage.setItem("cart",JSON.stringify(unique))
            setTooltip('Sản phẩm này đã được thêm vào giỏ hàng')
            dispatch({
                type : "ADD_TO_CARTT",
                payload : unique
            })
            dispatch({
                type : "SET_VISIBLEE",
                payload : true
            })

        }
    }
    return (
        
        <div className="col-md-3 col-sm-12 mt-5 ">
        <div className="card colcart rowmanh manhborder" style={{ width: '18rem' }}>
            <img className="card-img-top imgadmin" src={images&&images.length>0 ? images[0].url : ""} alt="Card image cap" />
            <div className="card-body  carbody manhcartbodyuser">
                <h5 className="card-title descriptionmanh">{name}</h5>

                {/* <div className="starhome mt-3">
                <p className="card-text mr-1 "><i class="fas fa-bullhorn mr-2"></i>Đánh giá :</p> */}
                {product && product.ratings && product.ratings.length > 0 ? <div className='starhomeee'>{showAverage(product)}</div> : <p className="mt-3 detailchungrieng bobo pr-2"><i class="fas fa-bullhorn mr-2 "></i>Đánh giá : <p className='titlevote pl-2 '>Chưa đánh giá sao</p></p>}

                {/* </div> */}

                <p className="card-text mt-3 fontcoloee"><i class="fas fa-dollar-sign mr-2"></i>Giá : {price.toLocaleString()} VNĐ</p>
                <p className="card-text mt-3"><i className="fas fa-map-marker-alt mr-2" />Địa chỉ : {address}</p>
                <p className="card-text cartrt mt-3"><i class="fas fa-apple-alt mr-2"></i>Trạng thái : {states=="Đang bán" ?(<p className=" pl-2 trangthai1">{states}</p>) :(<p className=" pl-2 trangthai2">{states}</p>)}</p>
        
                <Link to={`/chi-tiet-san-pham/${slug}`}  className="btn btn-danger buttont mr-1 mt-1"><i className="fas fa-eye-slash mr-2" />Xem</Link>
                <Tooltip title={tooltip}><button onClick={btnAddtocart}  className="btn btn-outline-danger buttont mt-1 "><i className="fas fa-plus mr-2" />Thêm giỏ</button></Tooltip>
            </div>
        </div>
    </div>
           
           
        

    );
}

export default CartProductUser;
// {images&&images.length>0 ? images[0].url : ""}
// Trạng thái : {states=="Đang bán" ?(<p className=" pl-2 trangthai1">{states}</p>) :(<div className=" pl-2 trangthai2">{states}</div>)}