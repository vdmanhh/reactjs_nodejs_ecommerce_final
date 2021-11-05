import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { saveComment } from '../../function/comment';

const SingleComment = ({getCom,refreshComment, comment, postIdProduct }) => {
    const [changes, setChanges] = useState(false)
    const [content,setContent] = useState('')
    const { user } = useSelector((state) => ({ ...state }))
    const time = new Date().toLocaleString()
    const btnReply = (e) => {
        setChanges(!changes)
    }
    const btnSaveComent=(e)=>{
        e.preventDefault()
        console.log(time);
       if(content == ''){
        setChanges(!changes)
       }else{
        let writer = user._id
        let { email,name } = user
        
        let responseTo = comment._id
        saveComment({ writer, postIdProduct, content, email,time,name,responseTo }, user.token)
            .then(res => {
                refreshComment(res.data)
                // getCom(postIdProduct)
                setContent('')
                setChanges(!changes)
                // console.log(res.data);
            })
       }
    }
    return (

        <div className="contents ml-2 mt-5">
            <img className="imad" src='https://static.thenounproject.com/png/17241-200.png'></img>
            <div>
                <div className="xcx">
                    <h6 className='pr-2 namez'>{comment.name}</h6>
                    <p>{comment.time}</p>
                </div>
                <p>{comment.content}</p>
                <div className="phanhoi">
                    <i class="far fa-thumbs-up mt-1 mr-3"></i>
                    <i class="far fa-thumbs-down mt-1 mr-2"></i>
                    <h6 onClick={btnReply} className='replu'> Phản hồi</h6>
                </div>
                {
                    changes && (
                        <div className="input-group mb-3 inputreplk">
                            <input onChange={e=>setContent(e.target.value)} type="text" className="form-control" placeholder="Nhập bình luận của bạn" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <div className="input-group-append">
                                <button onClick={btnSaveComent} className="btn btn-danger ml-2" type="button" id="button-addon2">Bình luận</button>
                            </div>
                        </div>
                    )
                }


            </div>

        </div>




    );
}

export default SingleComment;