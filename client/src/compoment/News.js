
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findNew, getAllNew } from '../function/new'
import { Link } from 'react-router-dom';
const News = ({ }) => {
    const { slug } = useParams()
    const [news, setNews] = useState([])
    const [findnew, setFindnew] = useState('')
    useEffect(() => {
        console.log(slug);
        findNew(slug)
            .then(ress => {
                console.log('n:', ress.data);
                setFindnew(ress.data)
                getAllNew()
                    .then(res => {

                        setNews(res.data)
                    })
            })

    }, [slug])
    return (
        <div className='container-fluid mt-5'>
            <div className="row m5-5 rownew">
                <div className='col-8 mt-5 rowneww'>
                    <div className="boso">
                    <h3 className='ccontend'>{findnew.title}</h3>
                    <img className='news mt-3' src={findnew.image && findnew.image.length ? findnew.image[0] : ''} ></img>
                    <p className='mt-5 ccontend1 mb-5'>{findnew.contend}</p>
                    </div>
                </div>
                <div className='col-4 rownew mt-5 '>
                    <div className='lllll'><h4>Bài viết liên quan</h4></div>
                    {
                        news && news.length > 0 && news.map((n, k) => {
                            return (
                               <Link to={`/tin-tuc/${n.slug}`}> <div className="mt-5 lquan">
                               <img className="imgrelevant mr-3" src={n.image && n.image.length ? n.image[0] : ''}   ></img>
                               <p className='hehehaha'>{n.title}</p>
                           </div></Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default News;