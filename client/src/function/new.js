import axios from 'axios'

export const createNew = async(title,contend,image)=>{
    return(
        await axios.post(`http://localhost:8000/api/post-new`,{title,contend,image})
    )
}

export const getAllNew = async(title,contend,image)=>{
    return(
        await axios.get(`http://localhost:8000/api/get-new`,{})
    )
}
export const findNew = async(slug)=>{
    return(
        await axios.post(`http://localhost:8000/api/find-new`,{slug})
    )
}