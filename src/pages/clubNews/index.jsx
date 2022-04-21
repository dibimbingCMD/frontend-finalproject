import React, { useEffect, useState } from "react";

import './style.scss'
import Navbar from "../../components/navbar";
import axios from "axios";
import MostViewedNews from "../../components/mostViewedNews";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadcrumb";

export default function ClubNewsPage() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const params = useParams();
    const getData = async () => {
        const response = await axios.get('http://localhost:8000/news')
        setData(response.data.filter(item => item.club.includes(`${params.club}`)).sort((a,b)=>{
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }));
    };
    
    useEffect(() => {
        // getClub();
        getData();
        setPage(`${params.club}`)
    }, []);
    console.log(data);
    return(
        <div className="container-xxl px-md-5 bg-white shadow-lg home-page">
            < Navbar />
            < BreadCrumb 
                page = {page}/>
            <div className="col club-news-section">
                <div className="row">
                    <div className="col-md-8 left-col">
                        {data.map((d) => (
                            <a href={`/news/${d._id}`} key={d._id}>
                                <div className="row club-news-body">
                                    <div className="col-md-4 club-news-pict-div">
                                        <img src={`http://localhost:8000/${d.image}`} alt="img" className="club-news-pict"/>
                                    </div>
                                    <div className="col-md-8 club-news-headline">
                                        <h3 className="club-news-title">{d.title}</h3>
                                        <p className="club-news-content">{d.body.length > 250 ? `${d.body.substring(0,250)}. . .` : d.body}</p>
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