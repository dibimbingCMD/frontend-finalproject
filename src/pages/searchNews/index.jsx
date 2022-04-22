import React, { useEffect, useState } from "react";

import './style.scss'
import Navbar from "../../components/navbar";
import axios from "axios";
import MostViewedNews from "../../components/mostViewedNews";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadcrumb";

export default function SearchNewsPage() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const params = useParams();
    const getData = async () => {
        const response = await axios.post('http://localhost:8000/search')
        setData(response.data.sort((a,b)=>{
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }));
    };
    
    useEffect(() => {
        getData();
        setPage(`${params.club}`)
    }, []);
    console.log(data);
    return(
        <div className="container-xxl px-md-5 bg-white shadow-lg home-page">
            < Navbar />
            < BreadCrumb 
                page = {page}/>
            <div className="col search-news-section">
                <div className="row">
                    <div className="col-md-8 left-col">
                        {data.map((d) => (
                            <a href={`/news/${d._id}`} key={d._id}>
                                <div className="row search-news-body">
                                    <div className="col-md-4 search-news-pict-div">
                                        <img src={`http://localhost:8000/${d.image}`} alt="img" className="search-news-pict"/>
                                    </div>
                                    <div className="col-md-8 search-news-headline">
                                        <h3 className="search-news-title">{d.title}</h3>
                                        <p className="search-news-content">{d.body.length > 250 ? `${d.body.substring(0,250)}. . .` : d.body}</p>
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