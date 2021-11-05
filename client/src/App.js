
import './App.css';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {currentUser} from './function/User'
import { auth } from './Firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Suspense,lazy } from "react";
import { LoadingOutlined } from "@ant-design/icons";
// ///////////////
const Login = lazy(() => import ( './page/auth/Login'));
const Footer = lazy(() => import ( './page/header/Footer'));
const Header = lazy(() => import ( './page/header/Header'));
const Register = lazy(() => import ( './page/auth/Register'));
const RegisterComple = lazy(() => import ( './page/auth/RegisterComple'));
const AdminDaskBoard = lazy(() => import ( './page/admin/AdminDaskBoard'));

const ForgetPassword = lazy(() => import ( './page/auth/ForgetPassword'));
const AdminRouter = lazy(() => import ( "./router/AdminRouter"));
const AuthRouter = lazy(() => import ( './router/AuthRouter'));
const Category = lazy(() => import ( './page/admin/Category'));
const UpdateCategory = lazy(() => import ( './page/admin/UpdateCategory'));
const SubCategory = lazy(() => import ( './page/admin/SubCategory'));
const UpdateSubCategory = lazy(() => import ( './page/admin/UpdateSubCategory'));
const Product = lazy(() => import ( './page/admin/Product'));
const UpdateProduct = lazy(() => import ( './page/admin/UpdateProduct'));
const Home = lazy(() => import ( './page/Home'));
const ChiTietSP = lazy(() => import ( './page/ChiTietSP'));
const DrawSlide = lazy(() => import ( './compoment/DrawSlide'));
const Cart = lazy(() => import ( './page/Cart'));
const UserPayment = lazy(() => import ( './compoment/UserPayment'));
const News = lazy(() => import ( './compoment/News'));
const CheckOut = lazy(() => import ( './page/CheckOut'));
const Coupon = lazy(() => import ( './page/admin/Coupon'));
const CouponUpdate = lazy(() => import ( './page/admin/CouponUpdate'));
const CheckOutSuccess = lazy(() => import ( './page/CheckOutSuccess'));
const User = lazy(() => import ( './page/User'));
const Order = lazy(() => import ( './page/admin/Order'));
const ChooseCate = lazy(() => import ( './page/ChooseCate'));
const UserWishLish = lazy(() => import ( './page/user/UserWishLish'));
const Store = lazy(() => import ( './page/Store'));
// import UserWishLish from '';
function App() {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>({...state}));
  useEffect(()=>{
    const unsubcrible = auth.onAuthStateChanged(async (user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult();
      
       currentUser(user,idTokenResult.token)
       .then(res=>{
         console.log("current user==>",res.data);
          dispatch({
            type : "LOGIN",
            payload : {
              name : res.data.name,
              role: res.data.role,
              email : user.email,
              // email: res.data.email,
              // _id : res.data.id,
              _id: res.data._id,
              token : idTokenResult.token

                         
            }
          })
       }).catch(err =>{console.log("err:"+err);})
      }
    })
    return ()=> unsubcrible();
  },[dispatch])
  return (
    <> 
          <Suspense
      fallback={
        <h4 className="col text-center p-5  azyyy">
          __ Manh D.Vu EC
          <LoadingOutlined />
          MMERCE __
        </h4>
      }
    >
    <Router>
   
     <Header></Header>
     
     <DrawSlide></DrawSlide>
     <ToastContainer position="top-center" autoClose={2000}></ToastContainer>
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          {/* <Route path="/home">
            <Home />
          </Route>  */}
             <Route path="/home">
            <Home />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/tin-tuc/:slug">
            <News />
          </Route>

          <Route path="/register-comple">
            <RegisterComple />
          </Route>

          <Route path="/forget-password">
            <ForgetPassword />
          </Route>

          <Route path="/chi-tiet-san-pham/:slug">
            <ChiTietSP />
          </Route>
          <Route path="/gio-hang">
            <Cart />
          </Route>

          <Route path="/the-loai/:slug">
            <ChooseCate />
          </Route>


          <Route path="/lich-su">
            <User />
          </Route>

          <Route path="/cua-hang">
            <Store />
          </Route>

          <Route path="/san-pham-yeu-thich">
            <UserWishLish />
          </Route>

          <AuthRouter exact path="/user-payment"  component={UserPayment} />
          <AuthRouter exact path="/payment-success"  component={CheckOutSuccess} />
          <AuthRouter exact path="/thanh-toan"  component={CheckOut} />
          <AdminRouter exact path="/admin"  component={AdminDaskBoard} />
          <AdminRouter exact path="/category-admin"  component={Category} />
          <AdminRouter exact path="/category-update-admin/:slug"  component={UpdateCategory} />
          <AdminRouter exact path="/sub-category-admin"  component={SubCategory} />
          <AdminRouter exact path="/update-sub-category-admin/:slug"  component={UpdateSubCategory} />
          <AdminRouter exact path="/coupon-admin"  component={Coupon} />
          <AdminRouter exact path="/product-admin"  component={Product} />
          <AdminRouter exact path="/order-admin"  component={Order} />
          <AdminRouter exact path="/update-product-admin/:slug"  component={UpdateProduct} />
          <AdminRouter exact path="/coupon-update-admin/:_id"  component={CouponUpdate} />
        </Switch>

        <Footer></Footer>
    </Router>
    </Suspense>  
    </>
  );
}

export default App;
