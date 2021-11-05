import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import { Menu, Slider, Input, Radio, Checkbox } from 'antd'
import { filterPricees, filterProduct, getProductCount, getProductssManh } from '../function/product';
import CartProductUser from '../form/CartProductUser';
import { getAllCateUser, getAllSubUser } from '../function/category';
import Star from '../form/Star';
import manhdz from '../manhdz.PNG'
const Store = () => {
    const value =
        [{ "name": "Từ 10.000 đồng -> 50.000 đồng", "id": 1 },
        { "name": "Từ 50.000 đồng -> 100.000 đồng", "id": 2 },
        { "name": "Từ 100.000 đồng -> 300.000 đồng", "id": 3 }, { "name": "Từ 300.000 đồng -> 500.000 đồng", "id": 4 },
        { "name": "Từ 500.000 đồng -> 1.000.000 đồng", "id": 5 }, { "name": "Trên 1.000.000", "id": 6 }]

    const dispatch = useDispatch()
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search
    const [cates, setCates] = useState([])
    const [categoryId, setCategoryId] = useState([])
    const [products, setProducts] = useState([])
    const [productCount, setProductCount] = useState('')
    const [page, setPage] = useState(1)
    const [subs, setSubs] = useState([])

    const loadSub = () => {
        getAllSubUser()
            .then(res => {
                setSubs(res.data)
            })
    }
    const getCate = () => {

        getAllCateUser()
            .then(res => {

                setCates(res.data)
            })
    }
    useEffect(() => {
        loadSub()
        getCate()
        getProductCount()
            .then(res => {
                setProductCount(res.data);
            })
    }, [])

    useEffect(() => {
        getAllproductt();
    }, [page])

    const getAllproductt = () => {
        let sort = 'createdAt'
        let order = 'desc'
        getProductssManh({ page, sort, order })
            .then(res => {
                // console.log('had', res.data);
                setProducts(res.data)
            })
    }

    useEffect(() => {
        const delayed = setTimeout(() => {
            getProductFilter({ query: text })
            // dispatch({
            //     type : 'SEARCH',
            //     payload : {
            //         text :''
            //     }
            // })
            if (!text) {
                getAllproductt();
            }
        }, 300)
        return () => clearTimeout(delayed)
    }, [text])

    const getProductFilter = (arg => {
        filterProduct(arg)
            .then(res => {
                console.log("res.datay:====>", res.data);
                setProducts(res.data)
            })
    })
    //filter price

    // onChange Price
    const handleCheck = (e) => {
        console.log(e.target.value);
        let bien = e.target.value;
        if (e.target.value === '1') {
            let low = 10000
            let height = 50000
            console.log(low, height);
            getProductFilter({ low, height })
        }
        else if (e.target.value === '2') {
            let low = 50000
            let height = 100000
            console.log(low, height);
            getProductFilter({ low, height })
        }
        else if (e.target.value === '3') {
            let low = 100000
            let height = 300000
            console.log(low, height);
            getProductFilter({ low, height })
        }
        else if (e.target.value === '4') {
            let low = 300000
            let height = 500000
            console.log(low, height);
            getProductFilter({ low, height })
        }
        else if (e.target.value === '5') {
            let low = 500000
            let height = 1000000
            console.log(low, height);
            getProductFilter({ low, height })
        }
        else if (e.target.value === '6') {

            let low = 1000000
            let height = 10000000
            console.log(low, height);
            getProductFilter({ low, height })
        }


    }
    // onChange cate
    const handleCheckcate = (e) => {
        let inTheState = [...categoryId];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked);


        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryId(inTheState)
        // console.log('inTheState=',inTheState);
        getProductFilter({ category: inTheState })

    }

    const btnCate=(sub)=>{
        console.log('sub',sub);
        getProductFilter({ sub: sub })
    }

    // star
    const HandleClickStar=(star)=>{
        console.log(star);
        getProductFilter({ star: star })
    }
    return (
        <div className="container-fluid mb-5">
            <div className='row'>
                <div className='col-3 row-cuahang'>
                    <h4 className='mt-3 titlech'><i class="fas fa-search mr-2"></i>Bộ lọc tìm kiếm</h4>
                    <hr></hr>
                    <p>Tìm kiếm theo giá</p>
                    {
                        value && value.length > 0 && value.map((v, k) => {
                            return (
                                <div className="ml-4">
                                    <div>

                                        <div className="form-check mt-2">
                                            <input value={v.id} onChange={handleCheck} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" />
                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                {v.name}
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                    <hr></hr>
                    <p>Tìm kiếm theo Danh mục cha</p>
                    {


                        cates.map((c) => (
                            <div key={c._id}>
                                <Checkbox
                                    onChange={handleCheckcate}
                                    className="pb-2 pl-4 pr-4"
                                    value={c._id}
                                    name="category"
                                    checked={categoryId.includes(c._id)}
                                >
                                    {c.name}
                                </Checkbox>
                                <br />
                            </div>
                        ))
                    }
                    <hr></hr>

                    <p>Tìm kiếm theo Danh mục con</p>
                    <div className='row ml-1'>
                        {subs && subs.length > 0 && subs.map((s, k) => {
                            return (

                                <div className="btnbhshs ml-4">
                                    <button onClick={()=>btnCate(s._id)} className="btn btn-outline-success  mb-2">{s.name}</button>
                                </div>

                            )
                        })}

                       
                    </div>
                    <hr></hr>
                <p>Tìm kiếm theo đánh giá sao</p>
                    <div className="ml-4">
                <Star
                    starClick={HandleClickStar}
                    numberOfStars={5} 
                ></Star>
                  <Star
                    starClick={HandleClickStar}
                    numberOfStars={4} 
                ></Star>
                  <Star
                    starClick={HandleClickStar}
                    numberOfStars={3} 
                ></Star>
                  <Star
                    starClick={HandleClickStar}
                    numberOfStars={2} 
                ></Star>
                  <Star
                    starClick={HandleClickStar}
                    numberOfStars={1} 
                ></Star>
            </div>
            <hr></hr>
                </div>
                <div className='col-9 adkj'>
                    <div className="fathertheloai mb-5 clastitjd">
                        <p className="theeloai"><i class="fas fa-store mr-2 "></i>Cửa hàng món ngon</p>
                    </div>
                    <div className='row'>

                    {products && products.length > 0 ?(
                         products.map((p, k) => {
                            return (

                                <CartProductUser
                                    product={p}
                                ></CartProductUser>
                            )
                        })
                    ):(<div className='loichaa'>
                            <img className='imgcua-hang' src={manhdz}></img>
                            <h5>Không tìm thấy sản phẩm nào</h5>

                        </div>)
                            
                            
                            }

                    </div>
                    <Pagination className="text-center mt-5 mb-5" current={page} total={(productCount / 12) * 10} onChange={value => setPage(value)}></Pagination>
                </div>
            </div>
        </div>
    );
}

export default Store;