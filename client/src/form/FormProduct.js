import React from 'react';

const FormProduct = ({
    allcategory, onChangeCate,
    name, description, price, address, states, shipping, category,trangthai,ship,
    sub, discount, values, btnCreateProduct, allSubs, listenCate,showOption,listenSub
}) => {
    return (
        <>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Tên sản phẩm</label>
                <div className="col-sm-10">
                    <input value={name} onChange={onChangeCate} name="name" type="text" className="form-control input-form" id="inputPassword" placeholder="nhập tên sản phẩm" />
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Mô tả</label>
                <div className="col-sm-10">
                    <input value={description} onChange={onChangeCate} name="description" type="text" className="form-control input-form" id="inputPassword" placeholder="nhập mô tả" />
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Giá</label>
                <div className="col-sm-10">
                    <input value={price} onChange={onChangeCate} name="price" type="number" className="form-control input-form" id="inputPassword" placeholder="nhập giá" />
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Địa chỉ</label>
                <div className="col-sm-10">
                    <input value={address} onChange={onChangeCate} name="address" type="text" className="form-control input-form" id="inputPassword" placeholder="nhập địa chỉ" />
                </div>
            </div>


            <div className="form-group row mb-4">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Trạng thái</label>

                <select onChange={onChangeCate} name="states" onChange={onChangeCate} className="custom-select input-form selectorr">

                    <option key="0" >Chọn trạng thái</option>
                    <option key="1" value="Đang bán" >Đang bán</option>
                    <option key="2" value="Đóng cửa">Đóng cửa</option>
                    <option key="3" value="Đang giảm giá">Đang giảm giá</option>




                </select>

            </div>


            <div className="form-group row mb-4">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Shipping</label>

                <select  onChange={onChangeCate} name="shipping" onChange={onChangeCate} className="custom-select input-form selectorr">


                    <option key={0}>Chọn ship</option>
                   {
                      ship&& ship.map((c)=>{
                           return(
                            
                            <option key={c+1} value={c}>{c}</option>
                           )
                       })
                   }
                       



                </select>

            </div>

            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Giờ mở cửa</label>
                <div className="col-sm-10">
                    <input value={discount} onChange={onChangeCate} name="discount" type="text" className="form-control input-form" id="inputPassword" placeholder="nhập giờ" />
                </div>
            </div>

            {/* category */}
            <div className="form-group row mb-4">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Category</label>

                <select value={category} name="category" onChange={listenCate} className="custom-select input-form selectorr">
                    <option key="0">Chọn category</option>
                    {allcategory && allcategory.map((c, k) => {
                        return (
                            <option key={k + 1} value={c._id}>{c.name}</option>
                        )
                    })}


                </select>

            </div>

            {/* sub category */}
            {
                showOption&&(<div className="form-group row mb-4">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label label-form">Chọn SubCategory</label>

                    <select  onChange={listenSub} className="custom-select input-form selectorr">
                    <option key='0' >Chọn</option>
                        {allSubs && allSubs.length > 0 && allSubs.map((c, k) => {
                            return (
                                <option key={k+1} value={c._id}>{c.name}</option>
                            )
                        })}


                    </select>

                </div>) 

            }

            <button onClick={btnCreateProduct} className="btn btn-danger btn-cate mb-5">Tạo</button>
        </>
    );
}

export default FormProduct;