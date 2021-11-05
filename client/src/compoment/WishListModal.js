import React, { useState } from 'react';
import { Modal } from 'antd'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createWishlish } from '../function/wishlish';
const WishListModal=({slug,product})=> {
    const [modalVisible, setMdalVisible] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))
    const btnWishlish=()=>{ 
        if(user){
            setMdalVisible(true)
            console.log('product=',product);
            let {email,name} = user
            createWishlish({email,name,product},user.token)
            .then(res=>{
                console.log(res.data.kq);
            })
        }
        else{
            setMdalVisible(true)
        }
    }
    return (
        <>
           <button onClick={btnWishlish} className='btn btn-outline-danger ml-2'><i class="fas fa-heart mr-2"></i>Thêm mục yêu thích</button>
                
           
            <Modal
               
                centered
                visible={modalVisible}
                onOk={() => {
                    setMdalVisible(false)
                    
                }}
                onCancel={() =>
                    setMdalVisible(false)
                }

            >
                {
                    user && user.token ?(
                        <div>
                    <img className='imgwislis' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZN8qqWsQDofpT_6daeWljulNS_JLjAcYDbp8bSoWiI_1qFA_5jVBTQ02aL6aZXrarRs&usqp=CAU'></img>
                    <h5 className='pt-3 titi'>Sản phẩm này đã được thêm vào danh mục yêu thích của bạn !</h5>
                    <Link to={`/san-pham-yeu-thich`}><button className='btn btn-success btnlikee mt-2'><i class="fas fa-heart mr-2"></i>Đi tới mục yêu thích</button></Link>
                </div>
                    ):(
                        <>
                        <h5 className='pt-3 titi'>Bạn cần đăng nhập để thêm sản phẩm này vào mục yêu thích !</h5>
                        <Link to={{
                          pathname: "/login",
                          state: { from: `chi-tiet-san-pham/${slug}` }  
                        }}><button className='btn btn-danger btnlikee mt-2'><i class="fas fa-heart mr-2"></i>Đi tới trang đăng nhập</button></Link></>
                    )
                }
                
            </Modal>
        </>
    );
}

export default WishListModal;