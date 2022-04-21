import React, { useEffect, useState } from "react";

import './style.scss'
import Navbar from "../../components/navbar";
import axios from "axios";
import MostViewedNews from "../../components/mostViewedNews";
import { useParams } from "react-router-dom";

export default function CategoryNewsPage() {
    const [data, setData] = useState([]);
    const params = useParams();
    const getData = async () => {
        const response = await axios.get('http://localhost:8000/news')
        setData(response.data.filter(item => item.category.includes(`${params.category}`)).sort((a,b)=>{
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }));
    };
    
    useEffect(() => {
        getData();
    }, []);
    console.log(data);
    return(
        <div className="container-xxl px-md-5 bg-white shadow-lg home-page">
            < Navbar />
            <div className="col category-news-section">
                <div className="row">
                    <div className="col-md-8 left-col">
                        {data.map((d) => (
                            <a href={`/news/${d._id}`} key={d._id}>
                                <div className="row category-news-body">
                                    <div className="col-md-4 category-news-pict-div">
                                        <img src={`http://localhost:8000/${d.image}`} alt="img" className="category-news-pict"/>
                                    </div>
                                    <div className="col-md-8 category-news-headline">
                                        <h3 className="category-news-title">{d.title}</h3>
                                        <p className="category-news-content">{d.body.length > 250 ? `${d.body.substring(0,250)}. . .` : d.body}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <MostViewedNews />
                </div>
            </div>
        </div>
    )
}