import axios from "axios"

export const CreatOrUpdateUser = async (authtoken)=>{
    return await axios.post(`http://localhost:8000/api/create-or-update`,{},
    {
        headers:{
          authtoken
        }
    }
    )
}
export const currentUser=async(user,authtoken)=>{
  return await axios.post(`http://localhost:8000/api/current-user`,{user},{
    headers:{
      authtoken
    }
  })
} 

export const forgetPass=async(email)=>{
  return await axios.post(`http://localhost:8000/api/forget-pass`,{email},{
  
  })
} 
export const checkAdmin = async(user,authtoken)=>{
  return await axios.post(`http://localhost:8000/api/check-admin`,{user},{
    headers:{authtoken}
  })
}


export const UserCart = async(user,authtoken)=>{
  return await axios.post(`http://localhost:8000/api/user-cart`,{user},{
    headers:{authtoken}
  })
}

export const saveAddressUser = async(user,authtoken)=>{
  return await axios.post(`http://localhost:8000/api/save-address`,{user},{
    headers:{authtoken}
  })
}

export const applyCoupon = async(user,authtoken)=>{
  return await axios.post(`http://localhost:8000/api/apply-coupon`,{user},{
    headers:{authtoken}
  })
}

