import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingCard from '../compoment/LoadingCard';
import CartProductUser from '../form/CartProductUser';
import Jumbotron from '../form/Jumbotron';
import Slide from '../form/Slide';
import { findCates } from '../function/sub';
import manhdz from '../manhdz.PNG'

const ChooseCate = ({ }) => {
    const { slug } = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        findCates({ slug })
            .then(res => {
                console.log('kg:', res.data);
                setProducts(res.data)
            })
    }, [])
    return (
        <>
            <div className="jumbotron text-center h1 text-danger font-weight-bold mt-5 jumbotronn">
                <Jumbotron textt={["Ẩm thực Việt Nam !"]}></Jumbotron>
            </div>
            <Slide></Slide>

            <div className="container-fluid  mb-5">
                <div className="row">
                    <div className='col-2'></div>
                    <div className='col-8'>
                        <div className='row'>
                            <div className='titledanhmuctim pl-3 mt-5 ml-3'>
                                <h3 className='h3h3'>Có {products.length} sản phẩm trong danh mục</h3>
                            </div>
                        </div>
                        {
                            products.length == 0 && (
                                <div className='row emptyproduct mt-5'>
                                    <div className="copupast">
                                        <img className="imgtimthau" src={manhdz}></img>
                                        <p className='titlereleavantnt pl-5'>Không có sản phẩm nào được tìm thấy !</p>
                                    </div>
                                </div>
                            )
                        }

                        {products.length < 0 ? (<LoadingCard count={4}></LoadingCard>) : (
                            <div className="row mb-5">

                                {products && products.length > 0 && products.map((p, k) => {
                                    return (

                                        <CartProductUser
                                            product={p}
                                        ></CartProductUser>
                                    )
                                })}
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className='col-2'></div>
            </div>
        </>
    );
}

export default ChooseCate;