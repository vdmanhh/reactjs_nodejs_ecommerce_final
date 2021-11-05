import axios from 'axios' 

export const createCoupon=async(user,authtoken)=>{
    return(
        await axios.post(`http://localhost:8000/api/create-coupon`,{user},{
            headers:{
                authtoken
            }
        })
    )
}

export const getCoupon=async(user,authtoken)=>{
    return(
        await axios.post(`http://localhost:8000/api/get-coupon`,{user},{
            headers:{
                authtoken
            }
        })
    )
}
export const deleteCoupon=async(user,authtoken)=>{
    return(
        await axios.post(`http://localhost:8000/api/delete-coupon`,{user},{
            headers:{
                authtoken
            }
        })
    )
}

export const findCoupon=async(user,authtoken)=>{
    return(
        await axios.post(`http://localhost:8000/api/find-coupon`,{user},{
            headers:{
                authtoken
            }
        })
    )
}

export const updateCoupon=async(user,authtoken)=>{
    return(
        await axios.post(`http://localhost:8000/api/update-coupon`,{user},{
            headers:{
                authtoken
            }
        })
    )
}