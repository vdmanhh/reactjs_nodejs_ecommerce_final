import React, { useEffect } from 'react';
import { useState } from 'react';
import FormProduct from '../../form/FormProduct';
import Navbar from '../../form/Navbar';
import {useSelector} from 'react-redux'
import { getAllCate } from '../../function/category';
import {findSubs} from "../../function/sub"
import UploadFileProduct from '../../form/UploadFileProduct'
import {createProduct} from '../../function/product'
import { LoadingOutlined } from '@ant-design/icons';
import {toast} from "react-toastify"
import { Spin } from 'antd';
const giatri = {
    name :"",
    description : "",
    price : "",
    address : "",
    states: "",
    shipping: "",
    category : "",
    sub: "",
    ship:["Có","Không"],
    trangthai :["Đang bán","Đóng cửa","Đang giảm giá"],
    images : [],
    discount : ""
}
const Product=()=> {
    const [loading,setLoading] = useState(false)
    const [allcategory,setAllcategory] = useState([])
    const [values,setValues] = useState(giatri)
    const {user} = useSelector((state)=>({...state}))
    const [allSubs,setAllSubs] = useState([])
    const [showOption,setShowOption]= useState(false)
    useEffect(()=>{
        setValues({...values,images : []})
    },[])
    const {
        name,
        ship,
        trangthai,
        description,
        price,
        address,
        states,
        shipping,
        category,
        sub,
        images,
        discount
    }= values

    useEffect(()=> {
        let {email} = user
        getAllCate({email},user.token)
        .then(res=>{
            setAllcategory(res.data)
        })
    },[])

    const onChangeCate=(e)=>{
        e.preventDefault()
        setValues({...values, [e.target.name] : e.target.value})      
    }

           const listenCate=(e)=>{
                e.preventDefault()
                setValues({...values, category : e.target.value})
                const parent = e.target.value
                let {email} = user
                findSubs({email,parent},user.token)
                .then(res=>{
                    console.log(res.data);
                    setAllSubs(res.data.subb)
                    setShowOption(true)
                })
            }

    const btnCreateProduct=(e)=>{
        e.preventDefault()

        console.log(values.shipping);


     if(!name|| !description||!price||!address ||!states|| !shipping||!category||!sub||!images||!discount){
         toast.error("Bạn cần điền đầy đủ các thông tin !")
     }
     else{
        let {email}=user
        createProduct({values,email},user.token)
        .then(res=>{
           if(res.data.kq=="oke"){
               toast.success("Tao san pham thanh cong")
               setValues({...values,
                name :"",description:"",
                price:"",states:"",address:"",
                discount:"",images:[],category:"",ship:["Có","Không"]})
               setShowOption(false)
           }
           else{
               toast.error("Tao san pham khong thanh cong")
           }
        })
     }
       
    }
    const listenSub=(e)=>{
        setValues({...values,sub : e.target.value})
        
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <div className="container-fluid mt-5 container-admin">
            <div className="row">
                <Navbar></Navbar>
                <div className="col-9 sideebar-right">
                    <h3 className="title-admin"><i class="fas fa-calendar-alt mr-2"></i>Trang SubCategory</h3>
                    {loading ? <h3>Loading <Spin indicator={antIcon} /></h3>:(<h5 className="mt-3">Tạo Product</h5>)}

                    <form className="mt-4">
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-1 col-form-label">Chọn ảnh</label>
                            <UploadFileProduct
                             values={values}
                             setValues={setValues}
                            setLoading={setLoading}
                           
                            ></UploadFileProduct>
                        </div>

                      <FormProduct
                      allcategory={allcategory}
                      onChangeCate={onChangeCate}
                    name={name}
                    description={description}
                    price={price}
                    address={address}
                    listenSub={listenSub}
                    states={name}
                    shipping={shipping}
                    category={category}
                    sub={sub}
                    btnCreateProduct={btnCreateProduct}
                    discount={discount}
                    values={values}
                    allSubs={allSubs}
                    listenCate={listenCate}
                    showOption={showOption}
                    trangthai={trangthai}
                    ship={ship}
                      ></FormProduct>

                        


                    </form>

                   

                  


                </div>




            </div>
        </div>
    );
}

export default Product;