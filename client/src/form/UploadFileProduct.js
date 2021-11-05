import React, { useEffect, useState } from 'react';
import { Avatar, Badge } from 'antd'
import { useSelector } from 'react-redux'
import Resizer from 'react-image-file-resizer';
import axios from 'axios'

const UploadFileProduct=({values,setValues,setLoading})=> {
    const { user } = useSelector((state) => ({ ...state }));
    const [token,setToken] = useState('')
    const [email,setEmail] =useState('')
    useEffect(()=>{
        setToken(user.token)
        setEmail(user.email)
        // console.log('token',token);
    },[])
    const fileUploadAnResize = (e) => {

        let allUploadFiles = values.images;

        let files = e.target.files
        if (files) {
           
            setLoading(true)
            // const {email}=user
         
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        // console.log(url);
                        let user = {
                            email,image: uri 
                        }
                        // console.log("token : ",token);
                        axios.post(
                            `http://localhost:8000/api/uploadimages`,

                            { user},
                            {
                                headers: {
                                    authtoken: token 
                                }
                            }
                        )
                            .then((res) => {
                                console.log("images upload data:", res.data);
                                setLoading(false);
                                allUploadFiles.push(res.data)
                                setValues({ ...values, images: allUploadFiles })
                            })
                            .catch((err) => {
                                // console.log("upload image fail:" + err);
                                setLoading(false);
                            })
                    },
                    "base64"
                )
            }
        }
    }
    const handleRemoveImg=(public_id)=>{
        console.log("id:",public_id);
        setLoading(true);
        // const token =user.token
        // console.log("token :",token);
        const user = {email,public_id}
        axios.post(`http://localhost:8000/api/removeimages`,{user},
        {
            headers :{
                authtoken: token 
            }
        }
        )
        .then((res)=>{
            setLoading(false);
            const {images}=values;
            let filterImages = images.filter((item)=>{
                return item.public_id !== public_id;
            })
            setValues({...values,images:filterImages})
        }).catch((err)=>{
            console.log("err:",err);
            setLoading(false)
        })
    }
    return (
        <>
           <div className="col-sm-8">
                {
                    values.images && values.images.map((img) => {
                        return (
                            <Badge count="X" style={{cursor : "pointer"}} key={img.public_id} onClick={()=>handleRemoveImg(img.public_id)}>
                               <div className="col">
                               <Avatar
                                
                                    size={100}
                                    className="m-6"
                                    src={img.url}
                                    shape={'square'}
                                ></Avatar>
                               </div>
                               
                            </Badge>

                        )
                    })
                }
           
            <div className="ml-3 mt-2">
                <div class="file  ">
                    
					<input
                        className="filess1"
                        type="file"
                        multiple

                        accept="images/*"
                        onChange={fileUploadAnResize}
                    />
                </div>


            </div>
            </div>
        </>
    );
}

export default UploadFileProduct;