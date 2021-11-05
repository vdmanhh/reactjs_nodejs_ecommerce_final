import React from 'react';
import { useSelector } from 'react-redux';
import { DeleteProduct } from '../function/product';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CartProduct = ({ product,getAllProducts }) => {
    const {user} = useSelector((state)=>({...state}))
    const { name, price, description, discount, states, address, images,slug } = product
    const btnDelete=(e,slug)=>{
       if(window.confirm("Ban co chac muon xoa san pham nay khong?")){
        let {email} = user;
        e.preventDefault()
        DeleteProduct({email,slug},user.token)
        .then(res=>{
            if(res.data.kq=='oke'){
                toast.success("Xoa thanh cong !")
                getAllProducts()
            }
            else {
                toast.error("Xoa ko thanh cong !")
            }
        })
       }
    }
    return (
       <>
        <div className="col-md-3 col-sm-12 colcartt mt-5">
            <div className="card colcart colcarttt" style={{ width: '18rem' }}>
                <img className="card-img-top imgtopp" src={images&&images.length>0 ? images[0].url : ""} alt="Card image cap" />
                <div className="card-body  carbody">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text text-price"><i className="fas fa-dollar-sign mr-2" />Giá : {price} đ</p>
                    <p className="card-text"><i className="fas fa-map-marker-alt mr-2" />Địa chỉ : {address}</p>
                    <p className="card-text cartrt"><i class="fas fa-apple-alt mr-2"></i>Trạng thái : {states=="Đang bán" ?(<p className=" pl-2 trangthai1">{states}</p>) :(<div className=" pl-2 trangthai2">{states}</div>)}</p>
                    <p className="card-text"><i class="fas fa-apple-alt mr-2"></i>Giảm giá: {discount} %</p>
                    <button href="#" onClick={(e)=>btnDelete(e,slug)} className="btn btn-warning buttont mr-1"><i className="fas fa-eye-slash mr-2" />Xóa</button>
                    <Link to={`/update-product-admin/${slug}`} className="btn btn-warning buttont"><i className="fas fa-plus mr-2" />Cập nhật</Link>
                </div>
            </div>
        </div>
        
       </>
    );
}

export default CartProduct;