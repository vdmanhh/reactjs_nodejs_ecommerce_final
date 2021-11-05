import axios from "axios"

export const createProduct = async (user,authtoken)=>{

    return await axios.post(`http://localhost:8000/api/create-product-admin`,{user},{
        headers:{
            authtoken
        }
    })
}


export const getProductCount = async (user,authtoken)=>{

    return await axios.get(`http://localhost:8000/api/get-product-count-admin`,{},{
     
    })
}
export const getProductss = async (user)=>{

    return await axios.post(`http://localhost:8000/api/get-allproduct-admin`,{user})
}


export const getProductssManh = async (user)=>{

    return await axios.post(`http://localhost:8000/api/get-allproduct-user`,{user})
}

export const DeleteProduct = async (user,authtoken)=>{

    return await axios.post(`http://localhost:8000/api/delete-product-admin/${user.slug}`,{user},{
        headers:{
            authtoken
        }
    })
}

export const finddOneProduct = async (user,authtoken)=>{

    return await axios.post(`http://localhost:8000/api/find-one-product`,{user},{
        headers:{
            authtoken
        }
    })
}


export const updateProduct = async (user,authtoken)=>{

    return await axios.post(`http://localhost:8000/api/update-product-admin`,{user},{
        headers:{
            authtoken
        }
    })
}


export const getOneProduct = async (user)=>{

    return await axios.post(`http://localhost:8000/api/get-product`,{user})
}

export const getRelevantProduct = async (user)=>{

    return await axios.post(`http://localhost:8000/api/get-product-relevant`,{user},{})
}

export const VoteStarProduct = async (user,authtoken)=>{

    return await axios.post(`http://localhost:8000/api/voting-star`,{user},{
        headers:{
            authtoken
        }
    })
}


export const filterProduct = async (arg)=>{

    return await axios.post(`http://localhost:8000/api/filters-product`,{arg})
}

export const filterPricees = async (arg)=>{

    return await axios.post(`http://localhost:8000/api/filters-price`,{arg})
}

