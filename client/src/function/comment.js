import axios from 'axios'

export const saveComment=async(user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/save-comment`,{user},{
        headers:{
            authtoken
        }
    })
}

export const getComments=async(postIdProduct)=>{
    return await axios.post(`http://localhost:8000/api/get-comment`,{postIdProduct},{ })
}