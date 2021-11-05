import React, { useEffect,useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navbar from '../../form/Navbar';
import UploadFileProduct from '../../form/UploadFileProduct'
import {toast} from "react-toastify"
import FormUpdateProduct from '../../form/FormUpdateProduct';
import { findOneCategory, getAllCate } from '../../function/category';
import {useSelector} from 'react-redux'
import { finddOneProduct, updateProduct } from '../../function/product';
import {findSubs, findSubsforProduct} from '../../function/sub'
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
const UpdateProduct=({})=> {
    const history = useHistory()
    const [loading,setLoading] = useState(false)
    const [values,setValues] = useState(giatri)
    const [allcategory,setAllcategory] = useState([])
    const {slug} = useParams()
    const [idSub,setIdSub]  = useState('')
    const [subbb,setSubbb] = useState('')
    const [showOption,setShowOption]= useState(false)
    const [allSubs,setAllSubs] = useState([])
    const {user} = useSelector((state)=>({...state}))
    const [categori,setCategori] =  useState()
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
    useEffect(() => {
      console.log(slug);
      finddOneProduct({slug},user.token)
      .then(res=>{
        //   console.log(res.data.product.category);
          setValues(res.data.product)
          let _id = res.data.product.category
          let id = res.data.product.sub
          findOneCategory({_id},user.token)
         .then(ress=>{
            //  console.log(ress.data.name);
            setShowOption(true)
             setCategori(ress.data.name)
             setIdSub(id)
                let parent = _id
                let {email} = user
                findSubs({email,parent},user.token)
                .then(res=>{
                    // console.log('f:',res.data.subb);
                    setAllSubs(res.data.subb)
                    findSubsforProduct({id},user.token)
                    .then(respon=>{
                        // console.log("name sub :",respon.data.name);
                        setSubbb(respon.data.name)
                    })
                })
               
         })
      })
    }, [])
    const onChangeCate=(e)=>{
        e.preventDefault()
        console.log(e.target.name ,':' , e.target.value);
        setValues({...values, [e.target.name] : e.target.value})      
    }

    const btnUpdateProduct=(e)=>{
        e.preventDefault()
        console.log(values);
        let {email} = user
        updateProduct({email,slug,values},user.token)
        .then(res=>{
            if(res.data.kq ="oke"){
                toast.success("cap nhat thanh cong")
                 history.push('/admin')
            }
            else {
                toast.error("cap nhat khong thanh cong")
            }
        })
    }

    const listenCate=(e)=>{
        console.log(e.target.value);
        let parent = e.target.value
        let {email} = user
       if(parent !==""){
        setValues({...values,category : e.target.value})
        findSubs({email,parent},user.token)
        .then(res=>{
            setSubbb('')
            setAllSubs(res.data.subb)
            // setSubbb('')
        })
       }
       else {
        setValues({...values})
        test();
        findSubs({email,parent},user.token)
        .then(res=>{
            setSubbb('')
            setAllSubs(res.data.subb)
            // setSubbb('')
        })
       }



    }

    const test = ()=>{
        let parent = values.category
        
    }

    const  listenSub=(e)=>{
        console.log(e.target.value);
        const gtri = e.target.value
        if(gtri !==''){
            setValues({...values,sub : e.target.value})
        }
        else {
            setValues({...values})
        }
    }
    return (
        <div className="container-fluid mt-5 container-admin">
            <div className="row">
                <Navbar></Navbar>
                <div className="col-9 sideebar-right">
                    <h3 className="title-admin"><i class="fas fa-calendar-alt mr-2"></i>Trang Cập nhật sản phẩm</h3>
                    {loading ? <h3>Loading...</h3>:(<h5 className="mt-3">Cập nhật sản phẩm</h5>)}

                    <form className="mt-4">
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-1 col-form-label">Chọn ảnh</label>
                            <UploadFileProduct
                             values={values}
                             setValues={setValues}
                            setLoading={setLoading}
                           
                            ></UploadFileProduct>
                        </div>

                      <FormUpdateProduct
                      allcategory={allcategory}
                      onChangeCate={onChangeCate}
                    name={name}
                    description={description}
                    price={price}
                    address={address}
                    listenSub={listenSub}
                    states={states}
                    shipping={shipping}
                    category={category}
                    categori={categori}
                    sub={sub}
                    idSub={idSub}
                    subbb={subbb}
                    btnCreateProduct={btnUpdateProduct}
                    discount={discount}
                    values={values}
                    allSubs={allSubs}
                    
                    listenCate={listenCate}
                    showOption={showOption}
                    trangthai={trangthai}
                    ship={ship}
                      ></FormUpdateProduct>

                        


                    </form>

                   

                  


                </div>




            </div>
        </div>
    );
}

export default UpdateProduct;