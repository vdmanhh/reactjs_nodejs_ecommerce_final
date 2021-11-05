import React from 'react';
import {Link} from 'react-router-dom'
const NavBarUser=({user})=> {
    return (
        <div className='col-4 col4history contaihitory'>
                    <div>
                        <img className='imgsuc mt-4' src='https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'></img>
                        <div>
                            <h5 className='titit mt-2'>{user?user.email:<h5 className="khachhangg">Khách hàng</h5>}</h5>
                            <p className='ptitks'>Luôn luôn mang tới những món ăn ngon nhất cho khách hàng</p>
                        </div>
                    </div>
                    <hr></hr>
                   <Link to={'/lich-su'}> <div className="samsam tomauu"><i class="fas fa-ambulance mr-2"></i>Đơn hàng</div></Link>

                   <Link to={'/san-pham-yeu-thich'}><div className="samsam tomauu"><i class="fas fa-thumbs-up mr-2"></i>Sản phẩm yêu thích</div></Link>
                    <hr className='hrr'></hr>
                </div>
    );
}

export default NavBarUser;