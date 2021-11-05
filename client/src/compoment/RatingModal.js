import React, { useState } from 'react';
import { Modal } from 'antd'
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom';
const RatingModal = ({children,slug }) => {
    const history = useHistory()
    const [modalVisible, setMdalVisible] = useState(false)
    const {user} = useSelector((state)=>({...state}))
    const voteStar = () => {
       if(user &&user.token){
        setMdalVisible(true)
       }
       else history.push(
        {
            pathname : "/login",
            state :{from :`/chi-tiet-san-pham/${slug}`}
        }
    )
    }
    return (
        <>
            <div>
                <button onClick={voteStar} className="btn btn-danger"><i class="far fa-star mr-2"></i>{user &&user.token ? "Đánh giá sao" : 'Login to Vote'}</button>
            </div>
            <Modal
                title="Hãy ủng hộ chúng tôi bằng cách đánh giá sao"
                centered
                visible={modalVisible}
                onOk={() => {
                    setMdalVisible(false)
                    toast.success("Cảm ơn bạn đã đánh giá sản phẩm")
                }}
                onCancel={() =>
                    setMdalVisible(false)
                }

            >
                {children}
            </Modal>
        </>
    );
}

export default RatingModal;