import axios from 'axios'

export const getCartUser=async(user,authtoken)=>{
    return (
        await axios.post(`http://localhost:8000/api/get-cart`,{user},{
            headers:{
                authtoken
            }
        })
    )
}

export const emptyCart=async(user,authtoken)=>{
    return (
        await axios.post(`http://localhost:8000/api/empty-cart`,{user},{
            headers:{
                authtoken
            }
        })
    )
}

export const getCartUserPayment=async(user,authtoken)=>{
    return (
        await axios.post(`http://localhost:8000/api/get-cart-user-payment`,{user},{
            headers:{
                authtoken
            }
        })
    )
}


export const createOrder=async(user,authtoken)=>{
    return (
        await axios.post(`http://localhost:8000/api/create-order`,{user},{
            headers:{
                authtoken
            }
        })
    )
}