import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';


const DisplayComment = ({ commentList,refreshComment, product, getCom, parentCommentId,postIdProduct }) => {
    const [count, setCount] = useState('')
    const [changes, setChanges] = useState(false)
    useEffect(() => {
        let numberComment = 0;
        commentList.map((comment) => {
            if (comment.responseTo == parentCommentId) {
                numberComment++
            }
        })
        setCount(numberComment)

    }, [commentList])
    const btnOpen=()=>{
        setChanges(!changes)
    }
    let renderDispalyComment = (parentCommentId) => 

      
        commentList && commentList.length > 0 && commentList.map((comment, k) =>(
            <React.Fragment>
                    {comment.responseTo === parentCommentId &&(
                       <div className="condhh"> <SingleComment refreshComment={refreshComment} getCom={getCom} product={product} comment={comment} postIdProduct={postIdProduct}  ></SingleComment>
                        <DisplayComment
                            comment={comment}
                            commentList={commentList}
                            parentCommentId={comment._id} getCom={getCom}
                            postIdProduct={postIdProduct}
                            refreshComment={refreshComment}
                        ></DisplayComment></div>
                    )}
                    
                </React.Fragment>
        ))
       

    
    return (
        <div>

            {count > 0 && (
                <h6  onClick={btnOpen} className='pl-5 coso'><i class="fas fa-angle-double-down mr-2 ml-2"></i>Xem thêm ({count}) bình luận nữa</h6>
            )}
            {changes && renderDispalyComment(parentCommentId) }
        </div>
    );
}

export default DisplayComment;