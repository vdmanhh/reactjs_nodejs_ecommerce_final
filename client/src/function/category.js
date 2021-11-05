import axios from "axios"


export const getAllCate = async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/getall-category`,{user},{
        headers : {
            authtoken
        }
    })
}

export const createCategory = async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/create-category`,{user},{
        headers : {
            authtoken
        }
    })
}

export const deleteCategory = async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/delete-category/${user.slug}`,{user},{
        headers : {
            authtoken
        }
    })
}


export const findCategory = async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/find-category`,{user},{
        headers : {
            authtoken
        }
    })
}

export const updateCate = async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/update-category`,{user},{
        headers : {
            authtoken
        }
    })
}


export const findcateforsub = async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/find-category-forsub`,{user},{
        headers : {
            authtoken
        }
    })
}


export const findOneCategory = async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/find-one-category-product`,{user},{
        headers : {
            authtoken
        }
    })
}


export const getAllCateUser = async ()=>{
    return await axios.post(`http://localhost:8000/api/getall-category-user`,
    )
}

export const getAllSubUser = async ()=>{
    return await axios.post(`http://localhost:8000/api/getall-sub-user`,
    )
}