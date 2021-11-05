import React from 'react';
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className="col-3 ">
      <div className="list-group">
        <button type="button" className="list-group-item list-group-item-action active sidebarr">
          Trang DashBoard Admin
        </button>
        <Link className="linkk" to={'/admin'}><i class="fas fa-home mb-3 ml-5 mr-2 mt-3"></i>Trang chủ</Link>
        <Link className="linkk" to={'/category-admin'}><i class="mb-3 ml-5 fas fa-calendar-alt mr-2 mt-3"></i>Category</Link>
        <Link className="linkk" to={'/sub-category-admin'}><i class="mb-3 ml-5 fas fa-award mr-2 mt-3"></i>Sub Category</Link>
        <Link className="linkk" to={'/coupon-admin'}><i class="mb-3 ml-5 fas fa-tags mr-2 mt-3"></i>Mã giảm giá</Link>
        <Link className="linkk" to={'/product-admin'}><i class="mb-3 ml-5 fab fa-product-hunt mr-2 mt-3"></i>Sản phẩm</Link>
        <Link className="linkk" to={'/order-admin'}><i class="mb-3 ml-5 fab fa-product-hunt mr-2 mt-3"></i>Đơn hàng</Link>
      </div>
    </div>

  );
}

export default Navbar;