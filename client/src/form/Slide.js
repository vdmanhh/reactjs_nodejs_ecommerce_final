import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAllNew } from '../function/new';


const Slide = () => {
    const [news1, setNews1] = useState('')
    const [news2, setNews2] = useState('')
    const [news3, setNews3] = useState('')
    useEffect(() => {
        getAllNew()
            .then(res => {
               
                setNews1(res.data[0])
                setNews2(res.data[1])
                setNews3(res.data[2])
            })
    }, [])
    return (

        <div className="container mt-5">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {/* {news && news.length>0 && news.map((n,kk)=>{
                   return(
                    <li data-target="#carouselExampleIndicators" data-slide-to={kk} className="active" />
                   )
               })} */}
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Link to={`/tin-tuc/${news1.slug}`}><img className="d-block w-100 chieucao" src={news1.image&&news1.image.length ?news1.image[1] :''} alt="Second slide" /></Link>
                    </div>

                    <div className="carousel-item">
                        <Link to={`/tin-tuc/${news2.slug}`}><img className="d-block w-100 chieucao" src={news2.image&&news2.image.length ?news2.image[1] :''} alt="Second slide" /></Link>
                    </div>
                    <div className="carousel-item">
                        <Link to={`/tin-tuc/${news3.slug}`}><img className="d-block w-100 chieucao" src={news3.image&&news3.image.length ?news3.image[1] :''} alt="Third slide" /></Link>
                    </div>

                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>



        </div>
    );
}

export default Slide;