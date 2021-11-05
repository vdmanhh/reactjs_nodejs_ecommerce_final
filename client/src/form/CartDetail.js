import React, { useEffect, useState } from 'react';
import ModalImage from "react-modal-image";
import { useDispatch } from 'react-redux';
const CartDetail = ({ c, k }) => {
    const dispatch =useDispatch()
    const [prices,setPrices] = useState('')
    useEffect(()=>{
        setPrices(c.price)
    },[])
    const changeCount=(e)=>{
        let count = e.target.value <1 ? 1 : e.target.value
        console.log(count);
        let cart = [];
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((product,i)=>{
                if(product._id == c._id){
                    cart[i].count = count
                }
            })
            localStorage.setItem('cart',JSON.stringify(cart))
            dispatch({
                type:'ADD_TO_CARTT',
                payload : cart
            })
        }
    }
    const btndeleteCart=()=>{
      if(window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không ?')){
        let cart =[];
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
                
            }
            cart.map((p,i)=>{
                if(p._id == c._id){
                    cart.splice(i,1)
                }
            })
            localStorage.setItem('cart',JSON.stringify(cart))
            dispatch({
                type:'ADD_TO_CARTT',
                payload : cart
            })

        }
      }
    }
    return (

           <tbody>
            <tr>
                <td className="pt-5" scope="row">{k+1}</td>
                <td>  <div style={{width:"100px",height:'auto'}}>
                        {c.images&&c.images.length>0 ? (<ModalImage
                            small={c.images[0].url}
                            large={c.images[0].url}
                            alt="Hello !"
                        />) 
                        : (<ModalImage
                            small={''}
                            large={''}
                            alt="Hello !"
                          />)
                    }
                    </div></td>
                <td className="pt-5">{c.name}</td>
                <td className="pt-5">{prices.toLocaleString()} VNĐ</td>

                <td className="pt-5">
                    <input onChange={changeCount} value={c.count} type="number" className="text-center inputcatcontrol" class="form-control"></input>
                </td>

                <td className="pt-5">
                  {c.shipping ==="Có" ? <> Có</>: 'Không'}
                </td>
                <td className="pt-5">
                 
                 <button onClick={btndeleteCart} className="btn btn-danger"> Xóa</button>
                </td>
            </tr>
         </tbody>

    );
}

export default CartDetail;