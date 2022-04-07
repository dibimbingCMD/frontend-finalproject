import React, { useEffect, useState } from "react";
import axios from "axios";

import './style.scss'
import { Button, Card,CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import Navbar from "../../navbar";
const db = require('../../../db.json')

export default function NewsPage() {
    const [data, setData] = useState([]);
    const [newsHeader, setNewsHeader] = useState("");

    const getData = () => {
        setData(db.clubs)
    };
    const handleClub = () => {
        setNewsHeader("club")
    };
    const handleCategory = () => {
        setNewsHeader("category")
    };
    // const getData = async () => {
    //     const response = await axios.get('http://localhost:5000/club')
    //         setData(response.data);
    // };
    
    useEffect(() => {
        getData();
        if (newsHeader=="club") {handleCategory()} else {handleClub()}
    }, []);
    return(
        <>
            < Navbar 
                handleClub={handleClub}
                handleCategory={handleCategory}/>
            <div className="news-page">
                <div className="col">
                    <div className="col">
                        <div className="row news-header">
                            <h1 className="news-header-title">{newsHeader}</h1>
                        </div>
                        <div className="row catalogue">
                            <div className="col-md-8 left-col">
                                <a href="/login"><Button className="login-button">Login</Button></a>
                                {data.map((d) => (
                                    <a href="#" key={d.id}>
                                        <div className="row news-body">
                                            <div className="col-md-4 news-pict">
                                                <img src={`${d.logo}`} alt="img"/>
                                            </div>
                                            <div className="col-md-8 news-headline">
                                                <h1 className="news-title">{d.name}</h1>
                                                <p className="news-content">{d.name}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <div className="col-md-3 right-col">
                                <div className="row right-header">
                                    <h1>Most Viewed</h1>
                                </div>
                                {data.map((d) => (
                                    <a href="#" key={d.id}>
                                        <div className="row news-body">
                                            <div className="col news-headline">
                                                <h4 className="news-title">{d.name}</h4>
                                                <p className="news-content">{d.name}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}