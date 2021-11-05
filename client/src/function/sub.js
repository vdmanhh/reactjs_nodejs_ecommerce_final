import axios  from "axios";

export const CreateSub =async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/create-sub`,{user},{
        headers : {
            authtoken
        }
    })
}

export const getAllSub =async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/getall-sub`,{user},{
        headers : {
            authtoken
        }
    })
}

export const deletelSub =async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/delete-sub`,{user},{
        headers : {
            authtoken
        }
    })
}

export const findSub =async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/find-sub`,{user},{
        headers : {
            authtoken
        }
    })
}

export const updateSub =async (user,authtoken)=>{
    return await axios.put(`http://localhost:8000/api/update-sub`,{user},{
        headers : {
            authtoken
        }
    })
}


export const findSubs =async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/find-subs`,{user},{
        headers : {
            authtoken
        }
    })
}

export const findSubsforProduct =async (user,authtoken)=>{
    return await axios.post(`http://localhost:8000/api/find-subs-for-product`,{user},{
        headers : {
            authtoken
        }
    })
}


export const getAllSubs =async (user,authtoken)=>{
    return await axios.get(`http://localhost:8000/api/getall-subs`,{},{})
}

export const findCates =async (user)=>{
    return await axios.post(`http://localhost:8000/api/find-cates`,{user},{})
}