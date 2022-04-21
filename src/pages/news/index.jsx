import React, { useEffect, useState } from "react";
import axios from "axios";

import './style.scss'
import Navbar from "../../components/navbar";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

export default function NewsPage() {
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const params = useParams();
    const getData = async () => {
        const response = await axios.get(`http://localhost:8000/news/${params._id}`)
            setData(response.data);
    };
    const getUser = async () => {
        const response = await axios.get(`http://localhost:8000/user/${data.createdBy}`)
            setUser(response.data);
    };
    
    useEffect(() => {
        getData();
        getUser();
    }, []);
    console.log(user);
    return(
        <div className="container-xxl px-md-5 bg-white shadow-lg home-page">
            < Navbar />
            <section className="px-12 py-5 news-focus">
                <img src={`http://localhost:8000/${data.image}`} alt="Publish your news" className="d-block mx-auto img-fluid" width={566} height={208} loading={"lazy"}/>
                <div className="col-lg-12 mx-auto news-focus-body">
                    <p className="lead mb-4 details">Author: {data.createdBy} Date: {data.createdAt}</p>
                </div>
                <div className="col-lg-12 mx-auto news-focus-body">
                    <h1 className="display-5 fw-bold news-focus-title">{data.title}</h1>
                </div>
                <div className="col-lg-12 mx-auto news-focus-body">
                    <p className="lead mb-4">{data.body}</p>
                </div>
                <div className="col-12 mb-4 news-focus-category">
                    <FontAwesomeIcon icon={faTags}/> {data.category?.length > 1 ? data.category.join(", ") : data.category}
                </div>
            </section>
        </div>
    )
}