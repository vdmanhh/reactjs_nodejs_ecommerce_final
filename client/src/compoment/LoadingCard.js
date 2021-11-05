import React from 'react';
import {Skeleton,Card } from 'antd';

const LoadingCard=({count})=> {
    const card = () =>{
        let a=[]
        for(let i=0;i<count;i++){
            a.push(
                <Card className="col m-3" key={i}>
                    <Skeleton active></Skeleton>
                </Card>
            )
        }
        return a;
    }
    return (
     <div className="row mb-3">
         {card()}
     </div>
    );
}

export default LoadingCard;