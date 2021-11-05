import React from 'react'
import {Drawer} from 'antd'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
const DrawSlide=({})=> {
    const {cart,draw} = useSelector((state)=>({...state}))
    const dispatch = useDispatch()

    const onClose = () =>{
        dispatch({
            type : "SET_VISIBLEE",
            payload : false
        })
    }
    const styleimg ={
        height : "100px",
        width : "80%"
    }
    const goToCart=()=>{
        dispatch({
            type : "SET_VISIBLEE",
            payload : false
        })
    }
    return (
        <Drawer
       className="text-center drawsidebar"
       title = {`Có ${cart&&cart.length>0?cart.length:'0'} sản phẩm được thêm vào giỏ hàng`}
       onClose={onClose} visible={draw}>
         {cart&&cart.length>0&&cart.map((p)=>{
             return(
                 <div className="row">
                    <div className='col'>
                        {p.images&&p.images.length&&p.images[0] ? (
                        <div className="mb-5">
                            <img src={p.images&&p.images.length>0 ? p.images[0].url : ''} style={styleimg}></img>
                            {/* <p className="mt-3">{`${p.name} x ${p.count}`}</p> */}
                            <div className="mt-3 drr">
                                <p className='dr1 pl-4'>{p.name}</p>
                                <p className='dr2 pl-2'> x {p.count}</p>
                            </div>
                        </div>
                        ) : (
                            <div>
                            <img src={''} style={styleimg}></img>
                            <p>{`${p.name} x ${p.count}`}</p>
                        </div>
                        )}
                    </div>
                 </div>
             )
         })}
         <Link to={'/gio-hang'} className="btn btn-primary" onClick={goToCart}>Đi tới giỏ hàng</Link>
       </Drawer>
    )
}


export default DrawSlide

