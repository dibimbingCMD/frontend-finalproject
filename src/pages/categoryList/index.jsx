import React, { useEffect, useState } from "react";

import './style.scss'
import Navbar from "../../components/navbar";
import img2 from '../../assets/img/img1.jpg'
import axios from "axios";
import MostViewedNews from "../../components/mostViewedNews";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadcrumb";

export default function CategoriesListPage() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const params = useParams();
    const getData = async () => {
        const response = await axios.get('http://localhost:8000/news')
        setData(response.data);
    };
    const category = [];
    data.map((d) => d.category.map((dd) => {if (!category.includes(dd)){category.push(dd)}}))
    
    useEffect(() => {
        // getClub();
        getData();
        setPage("category")
    }, []);
    console.log(category);
    return(
        <div className="container-xxl px-md-5 bg-white shadow-lg home-page">
            < Navbar />
            < BreadCrumb 
                page = {page}/>
            <div className="col categories-list-section">
                <div className="row">
                    <div className="col-md-8 left-col">
                        {category.map((d, idx) => (
                            <a href={`/categories/${d}`} key={idx}>
                                <div className="row categories-list-body">
                                    <div className="col-md-4 categories-list-pict-div">
                                        <img src={img2} alt="img" className="categories-list-pict"/>
                                    </div>
                                    <div className="col-md-8 categories-list-headline">
                                        <h3 className="categories-list-title">{d}</h3>
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