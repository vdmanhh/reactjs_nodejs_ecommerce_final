import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getOneProduct, getRelevantProduct, VoteStarProduct } from '../function/product';
import { Carousel } from 'react-responsive-carousel';
// import { Carousel } from 'antd';
import { Tooltip } from 'antd';
import _ from "lodash";
import { useDispatch } from 'react-redux'
import CartProductUser from '../form/CartProductUser'

import { showAverage } from '../compoment/showAverage'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RatingModal from '../compoment/RatingModal';
import StarRating from 'react-star-ratings'
import { useSelector } from 'react-redux';
import manhdz from '../manhdz.PNG'
import WishListModal from '../compoment/WishListModal';
import Comment from '../compoment/comment.js/Comment';
import { getComments } from '../function/comment';
const ChiTietSP = ({ match }) => {
    const { slug } = useParams()
    const [star, setStar] = useState(0)
    const [price, setPrice] = useState('')
    const [product, setProduct] = useState('')
    const [productRelevant, setProductRelevant] = useState([])
    const [images, setImages] = useState([])
    const { user } = useSelector((state) => ({ ...state }))
    const [tooltip, setTooltip] = useState("Thêm giỏ hàng")
    const dispatch = useDispatch()
    const [commentList,setCommentList] = useState([])
    useEffect(() => {

        getProductt();
    }, [slug])

  const getCom = (postIdProduct=>{
    getComments(postIdProduct)
    .then(res=>{
        setCommentList(res.data)
        console.log("get comment : " ,res.data);
    })
  })
    const getProductt = () => {
        getOneProduct({ slug })
            .then(res => {
                // console.log('get :', res.data);
                setProduct(res.data)
                setPrice(res.data.price)
                setImages(res.data.images)
                let sub = res.data.sub
                getRelevantProduct({ sub })
                    .then(res => {
                        // console.log('lq : ',res.data);
                        setProductRelevant(res.data)
                    })
                let postIdProduct=res.data._id
                    // getComments(postIdProduct)
                    // .then(res=>{
                    //     setCommentList(res.data)
                    //     console.log("get comment : " ,res.data);
                    // })
                    getCom(postIdProduct)
                

            })
    }
    const changeRating = (newStar, name) => {
        let email = user.email
        console.log(name, newStar);
        setStar(newStar)
        VoteStarProduct({ email, newStar, name }, user.token)
            .then(res => {
                // console.log("res : ", res.data);
                getProductt();
            }).catch(err => {
                console.log('err : ', 'ko vote star dc');
            })
    }

    const btnAddtocart = () => {
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                ...product,
                count: 1
            })
            let unique = _.uniqWith(cart, _.isEqual);
            localStorage.setItem("cart", JSON.stringify(unique))
            setTooltip('Sản phẩm này đã được thêm vào giỏ hàng')
            dispatch({
                type: "ADD_TO_CARTT",
                payload: unique
            })
            dispatch({
                type: "SET_VISIBLEE",
                payload: true
            })

        }
    }
    const refreshComment =(news)=>{
        setCommentList(commentList.concat(news))
    }
    return (
        <>
            <div className="container mt-5 detailcontainer">
                <div className='row detailproductt'>
                    <div className="col-md-5 mt-5">
                        {
                            images && images.length && (

                                <Carousel showArrows={true} >
                                    {images && images.map((i) => {
                                        return <img key={i.public_id} src={i.url}></img>
                                    })}
                                </Carousel>

                            )

                        }
                    </div>
                    <div className='col-md-7 mt-5'>
                        <div className='titledetail'>
                            <p className='mr-2 titledetail1'><i class="fas fa-glass-cheers mr-2"></i>Siêu ngon</p>
                            <p className=' titledetail2'>{product.name}</p>
                        </div>

                        <div className='votestar'>
                            <p className="detailchung pr-2">Xếp hạng sao : </p>
                            {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <p className=" detailchungrieng  titlevote "> Chưa đánh giá sao</p>}


                        </div>


                        <div className='manhmanh'>
                            <p className="detailchung">Mô tả :</p>
                            <p className="detailchungrieng pl-2">{product.description}</p>
                        </div>
                        <div className='manhmanh'>
                            <p className="detailchung">Giá :</p>
                            <p className="detailchungrieng pl-2">{price.toLocaleString()} VNĐ</p>
                        </div>
                        <div className='manhmanh'>
                            <p className="detailchung">Địa chỉ :</p>
                            <p className="detailchungrieng pl-2">{product.address}</p>
                        </div>
                        <div className='manhmanh'>
                            <p className="detailchung">Giờ mở cửa :</p>
                            <p className="detailchungrieng pl-2">{product.discount}</p>
                        </div>
                        <div className='manhmanh'>
                            <p className="detailchung"> Trạng thái:</p>
                            <p className=" pl-2">{product.states === 'Đang bán' ? <p className='statedetail'>{product.states}</p> : <p className='statedetai2'>{product.states}</p>}</p>
                        </div>

                        <div className="btndetaill">
                            <Tooltip placement="bottom" title={tooltip}><button onClick={btnAddtocart} className="btn btn-outline-danger mr-2"><i class="fas fa-cart-arrow-down mr-2"></i>Thêm giỏ hàng</button></Tooltip>

                            <RatingModal slug={slug}>
                                <StarRating
                                    name={product._id}
                                    starRatedColor="red"
                                    numberOfStars={5}
                                    rating={star} //default star
                                    isSelectable={true}
                                    changeRating={changeRating}
                                >
                                </StarRating>
                            </RatingModal>

                            <WishListModal
                                product={product}
                                slug={slug}></WishListModal>
                        </div>

                    </div>
                </div>
               
              
               <Comment getCom={getCom}
                product={product} 
                refreshComment={refreshComment} 
                commentList={commentList}></Comment>
                <div className="fathertheloai">
                    <p className="theeloai">Sản phẩm tương tự</p>
                </div>


                <div className='row mt-5 mb-5 reelevant'>
                    {productRelevant && productRelevant.length > 1 ? productRelevant.filter(productRelevant => productRelevant.name !== product.name).map((p, k) => {
                        return (
                            <div>
                                <CartProductUser
                                    key={k}
                                    product={p}
                                ></CartProductUser>
                            </div>
                        )
                    }) : (<div className="copupast">
                        <img className="imgtimthau" src={manhdz}></img>
                        <p className='titlereleavantnt'>Không có sản phẩm tương tự nào được tìm thấy !</p>
                    </div>)



                    }
                </div>
            </div>

        </>
    );
}

export default ChiTietSP;