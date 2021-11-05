import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveComment } from '../../function/comment';
import DisplayComment from './DisplayComment';
import SingleComment from './SingleComment';
const Comment = ({ product, refreshComment, commentList,getCom }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [content, setContent] = useState('')
    const time = new Date().toLocaleString()
    const onchangeValue = (e) => {
        setContent(e.target.value)
    }
    const btnSaveComent = (e) => {
        e.preventDefault()
        // console.log(time);
       if(!user){
           toast.error('Bạn cần đăng nhập để bình luận về sản phẩm này')
       }
       else{
        let writer = user._id
        let { email,name } = user
        let postIdProduct = product._id
        saveComment({ writer, postIdProduct, content, email,time,name }, user.token)
            .then(res => {
                refreshComment(res.data)
                // getCom(postIdProduct)
                setContent('')
                // console.log(res.data);
            })
       }
    }
    return (
        <>
         <div className="row mt-5 pt-5 pl-3 hbc"><h4>Bình luận</h4></div>
        <div className=' row commnet'>
 
            {/* {console.log('commentList', commentList)} */}
            <div className="col-8 mt-2">
                <div className="input-group mb-3">
                <input onChange={onchangeValue} type="text" value={content} className="form-control" placeholder="Nhập bình luận của bạn" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <div className="input-group-append">
                    <button disabled={content ==''} onClick={btnSaveComent} className="btn btn-danger ml-2" type="button" id="button-addon2">Bình luận</button>
                </div>
            </div>
            </div>
            <div className="col-4 mt-5"></div>

            <div className="rowd">
            {
                commentList && commentList.length > 0 && commentList.map((comment, k) => (
                    (!comment.responseTo && (
                        <React.Fragment>
                            <SingleComment refreshComment={refreshComment} getCom={getCom} product={product} comment={comment} postIdProduct={product._id}  ></SingleComment>
                            <DisplayComment 
                            comment={comment} 
                            product={product}
                            commentList={commentList}
                            parentCommentId  = {comment._id} getCom={getCom}
                            postIdProduct={product._id}
                            refreshComment={refreshComment}
                            ></DisplayComment>
                        </React.Fragment>
                    ))
                ))
            }
            </div>

        </div>
        </>
    );
}

export default Comment;