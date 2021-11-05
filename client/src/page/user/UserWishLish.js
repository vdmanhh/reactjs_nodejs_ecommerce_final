import React, { useEffect, useState } from 'react';
import NavBarUser from './NavBarUser';
import { useSelector } from 'react-redux'
import { deleteWish, getWishlish } from '../../function/wishlish';
import manhdz from '../../manhdz.PNG'
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
const UserWishLish=()=> {
    const { user } = useSelector((state) => ({ ...state }))
    const [wish,setWish] = useState([])
    useEffect(()=>{
        if(user){
            getWish();
        }
       
    },[])

    const getWish=()=>{
        let {email,name} = user ; 
        getWishlish({email,name},user.token)
        .then(res=>{
            console.log(res.data);
            setWish(res.data);
        })
    }
    const btndelete=(e,slug)=>{
        e.preventDefault()
        // console.log(slug);
       if(window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi danh mục yêu thích không ?')){
        let {email} = user ; 
        deleteWish({slug,email},user.token)
        .then(res=>{
                if(res.data.kq=='oke'){
                    toast.success('Xóa sản phẩm thành công !')
                    getWish();
                }
                else{
                    toast.error('Xóa sản phẩm không thành công')
                }
        })
       }
    }
    return (
        <div className="container mb-5 ">
            <div className='row mt-5 owcha'>
              <NavBarUser user={user}></NavBarUser>

                    {!user ?(
                        <div className="col-8 backback">
                        <div className='falil'>
                            <img className="imgerror" src={manhdz}></img>
                            <h5>Bạn phải đăng nhập thì mới xem được sản phẩm yêu thích</h5>
                        </div>
                        </div>
                    ):(
                        <div className='col-8 coloclo'>
                             <div className='mt-3'><h3 className='cuctt'>Sản phẩm yêu thích</h3></div>
                           
                         {wish&&wish.length>0&&wish.map((w,k)=>{
                             return(
                                 <>
                               
                                <div className='row mt-5'>
                                
                                  <div className='col-10 '>
                                  <Link to={`/chi-tiet-san-pham/${w.slug}`}>
                                      <div className='wihcha'>
                                          <img className="imgwishh" src={w.images&&w.images.length>0?w.images[0].url : ''}></img>
                                          <div className='hovecha'>
                                              <h5>{w.name_product}</h5>
                                              <p>{w.description}</p>
                                          </div>
                                      </div>
                                      </Link>
                                  </div>
                             
                                  <div className='col-2'>
                                      <div onClick={(e)=>btndelete(e,w.slug)} className='btn btn-danger mt-3'>Xóa</div>
                                  </div>
                                </div>
                               <hr></hr>
                                </>
                             )
                         })}
                        </div>
                    )}
                        
                 


            </div>
        </div>
    );
}

export default UserWishLish;