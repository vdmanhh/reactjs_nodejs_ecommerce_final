import React from 'react';
import StarRating from 'react-star-ratings'
const Star=({numberOfStars,starClick})=> {
    return (
        
             <>
            <StarRating
             changeRating={()=>starClick(numberOfStars)}
             numberOfStars={numberOfStars}
           
             starDimention="9px"
             starSpacing="2px"
             starHoverColor="red"
             starEmptyColor="red"
            >

            </StarRating>
            <br/>
        </>
   
    );
}

export default Star;