import React, { useEffect, useState } from 'react';
import Slide from '../form/Slide';
import { useSelector } from 'react-redux'
import { getAllSubs } from '../function/sub'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { getProductCount, getProductss } from '../function/product';
import CartProductUser from '../form/CartProductUser'
import Jumbotron from '../form/Jumbotron';
import LoadingCard from '../compoment/LoadingCard';
const Home = () => {
    const [subs, setSubs] = useState([])
    const [page, setPage] = useState(1)
    const [product, setProduct] = useState([])
    const [productCount, setProductCount] = useState(0)
    const [loading,setLoading] = useState(false)
 

 
    useEffect(() => {
      
        getAllSubs()
            .then(res => {
                setSubs(res.data)
                
            })
    }, [])
    useEffect(() => {

        getProductCount()
            .then(res => {

                setProductCount(res.data);
            })
    }, [])
    useEffect(() => {
        setLoading(true)
        getAllProducts();

    }, [page])
    const getAllProducts = () => {
        let sort = 'createdAt'
        let order = 'desc'
        getProductss({ page, sort, order })
            .then(res => {
                setProduct(res.data)
                setLoading(false)
            })
    }
   
    return (
        <>
            <div className="jumbotron text-center h1 text-danger font-weight-bold mt-5 jumbotronn">
                <Jumbotron textt={["Ẩm thực Việt Nam !"]}></Jumbotron>
            </div>
            <Slide></Slide>

            
            <div className="container-fluid  mb-5">

                <div className='container'>
                    <div className="fathertheloai">
                        <p className="theeloai">Chọn theo thể loại</p>
                    </div>
                    <div className="row mt-5">
                        {subs && subs.length > 0 && subs.map((s, k) => {
                            return (
                                <div className="col-md-2 col-sm-4 mt-4 colchonmonn">
                                    <Link to={`/the-loai/${s.slug}`} href="#">
                                        <img className="ml-4 imgtheloaiii" src={s.image && s.image.length > 0 ? s.image[0].url : ''} alt="" />
                                        <p className="titlechonmon mt-3">{s.name}</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    <div className="fathertheloai">
                        <p className="theeloai">Khám phá món mới</p>
                    </div>
                </div>

                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className='col-2'></div>
                        <div className='col-8'>
                            
                        {loading ? (<LoadingCard count = {4}></LoadingCard>) :(
                             <div className="row">
                             {product && product.length > 0 && product.map((p, k) => {
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

                <Pagination className="text-center mt-5 mb-5" current={page} total={(productCount / 8) * 10} onChange={value => setPage(value)}></Pagination>





            </div>

        </>
    );
}

export default Home;