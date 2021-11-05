import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import {Badge} from 'antd'
import {
  Link
} from "react-router-dom";
import firebase from 'firebase';
import { useHistory } from "react-router-dom"
const Header=()=> {
  const dispatch = useDispatch()
  const [key,setKey] = useState('')
  // const { user,cart,search } = useSelector((state) => ({ ...state }))
  const {user, cart,search } = useSelector((state) => ({ ...state }))
  const {text} = search

  const history = useHistory()
  // const datas = localStorage.getItem('user')
  const btnLogout = () => {

       window.localStorage.removeItem('user')
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    history.push("/login")
  }
  const btnSearch=(e)=>{
    e.preventDefault();
    console.log(key);
    dispatch({
      type : 'SEARCH',
      payload : {
        text : key
      }
    })
    
    history.push(`/cua-hang?${text}`)
    setKey('')
  }
  return (
    <div>
      <div>
        <nav className="navbar navbar-light bg-danger headerr">
          <a className="navbar-brand ml-5 titlle">Luôn luôn mang tới những món ăn ngon nhất cho khách hàng</a>
        </nav>
        <nav className="navbar navbar-light bg-light navvba">
          <a className="navbar-brand ml-5"><img src="https://loship.vn/dist/images/logo.png" /></a>
          <form className="form-inline mr-5">
            <input value={key} onChange={e=>setKey(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Tìm kiếm món ăn" />
            <button onClick={btnSearch} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Tìm kiếm</button>
          </form>
          <div>
            <p className="titlee sizetext mb-1"><i className="fas fa-phone pr-2" />035 468 9726</p>
            <p className=" sizetext">Miễn phí giao hàng cho đơn hàng từ 500k</p>
          </div>
          <div>
            <p className="titlee sizetext mb-1"><i className="fas fa-dollar-sign pr-2" />Đảm bảo hoàn tiền 100% </p>
            <p className=" sizetext">Nếu đơn hàng không đúng yêu cầu<u /></p>
          </div>

          {!user && (
            <div>
              <Link to={"/login"} className="titlee sizetext mb-1"><i class="fas fa-sign-in-alt mr-2"></i>Đăng nhập </Link>

            </div>
          )}

          {!user && (<div>
            <Link to={"/register"} className="titlee sizetext mb-1"><i class="fas fa-user-plus mr-2"></i>Đăng ký </Link>

          </div>)}
          {user && (
            <div className="btn-group">
              <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-user-alt  pr-2" />{user&&user.email.split("@")[0]}
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <Link to={'/lich-su'}><button className="dropdown-item" type="button"><i className="fas fa-file-medical-alt mr-2" />Lịch sử</button></Link>
                {user && user.role === "admin" && <Link to={'/admin'} className="dropdown-item" type="button"><i className="fas fa-file-medical-alt mr-2" />Amin Dashboard</Link>}
                <button onClick={btnLogout} className="dropdown-item" type="button"><i className="fas fa-sign-out-alt mr-2" />Đăng xuất</button>
              </div>
            </div>

          )}

        </nav>

     
          <div className="container mt-3">
          <div className="row roww">
            <Link to={'/home'} className=" meenu col-md-3 col-md-2 coll mb-2"><i className="fas fa-home mr-2" />Trang chủ</Link>
            <Link className="meenu col-md-3 col-md-2 col-md-3 coll mb-2"><i className="fas fa-map-marker-alt mr-2" />Khu vực</Link>
            <Link to={'/cua-hang'} className="meenu col-md-3 col-md-2 coll mb-2"><i className="fas fa-utensils mr-2" />Cửa hàng</Link>
            <Link to={'/gio-hang'} className="meenu col-md-3 col-md-2 coll mb-2"><i className="fas fa-cart-plus mr-2" /> <Badge count={cart&&cart.length>0?cart.length:'0'} offset ={[9,0]}>
                        Giỏ hàng 
              </Badge>
            </Link>
          </div>
        </div>
  

        






      </div>

    </div>
  );
}

export default Header;