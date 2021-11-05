import React from 'react';

const OrderChildren = ({ pp,statee }) => {
    return (
        <>
            {pp.map((m, k) => {
                return (
                    <tr>
                        <th scope="row">{k+1}</th>
                        <td>{m.product.name}</td>
                        <td>{(m.product.price).toLocaleString()} VNĐ</td>
                        <td className='pl-2'>{m.count}</td>
                        <td>{((m.product.price)*(m.count)).toLocaleString()} VNĐ</td>
                        <td>{statee}</td>
                    </tr>
                )
            })}
        </>
    );
}

export default OrderChildren;