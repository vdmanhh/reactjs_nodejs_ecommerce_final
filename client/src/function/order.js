import axios from 'axios'

export const getOrder=async(user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/getall-order`,{user},{
        headers : {
            authtoken
        }
    })
}


export const getOrderfilter=async(user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/filter-order`,{user},{
        headers : {
            authtoken
        }
    })
}

export const UpdateOrder=async(user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/update-order`,{user},{
        headers : {
            authtoken
        }
    })
}