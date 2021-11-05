import axios  from "axios";

export const createWishlish =async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/create-wish`,{user},{
        headers : {
            authtoken
        }
    })
}

export const getWishlish =async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/get-wish`,{user},{
        headers : {
            authtoken
        }
    })
}

export const deleteWish =async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/delete-wish`,{user},{
        headers : {
            authtoken
        }
    })
}