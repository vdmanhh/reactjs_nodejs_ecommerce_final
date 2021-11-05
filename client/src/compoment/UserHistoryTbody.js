import React from 'react';

const UserHistoryTbody = ({ product }) => {
    return (
        <>
            {
                product && product.length > 0 && product.map((c, k) => {
                    return (
                        <tr>
                            <th scope="row">{k + 1}</th>
                            <td>{c.product.name}</td>
                            <td>{(c.product.price).toLocaleString()} VNĐ</td>
                            <td>{c.count}</td>
                            <td>{((c.count) * (c.product.price)).toLocaleString()} VNĐ</td>
                        </tr>
                    )
                })
            }
        </>

    );
}

export default UserHistoryTbody;