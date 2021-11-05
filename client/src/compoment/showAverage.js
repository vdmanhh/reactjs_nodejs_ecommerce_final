import React from 'react';
import StarRating from 'react-star-ratings'

export const showAverage=(product)=> {
    if(product && product.ratings){
        let ratingArray = product && product.ratings;
        let total = [];
        let length = ratingArray.length;
        // console.log("length:",length);
        ratingArray.map((r)=>total.push(r.star));
        let totalReduce = total.reduce((p,n)=> p+n,0);
        // console.log('totalReduce:',totalReduce)
        let highest = length *5;
        // console.log('highest:',highest);
        let result = (totalReduce*5)/highest;
        // console.log('result:',result);
        return (
            <div className="">
                <span>
                    <StarRating className='pl-3' starDimension="25px"
                     starRatedColor="red" 
                     editing={false}
                     rating = {result} ></StarRating>{"   "}
                     ({product.ratings.length})
                </span>
            </div>
        );
    }
  
}

