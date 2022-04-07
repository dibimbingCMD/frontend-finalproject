import React, { useEffect, useState } from "react";

import './style.scss'
import { Button, Card,CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import Navbar from "../../navbar";
import Headline from "../../Headline";
const db = require('../../../db.json')

export default function HomePage() {
    const [data, setData] = useState([]);
    const getData = () => {
        setData(db.clubs)
    };
    // const getData = async () => {
    //     const response = await axios.get('http://localhost:5000/club')
    //         setData(response.data);
    // };
    
    useEffect(() => {
        getData();
    }, []);
    return(
        <>
            < Navbar />
            < Headline />
            <div className="news-page">
                <div className="col">
                    <div className="col catalogue">
                        <div className="col">
                            <a href="/login"><Button className="login-button">Login</Button></a>
                            <div className="row">
                                {data.map((d) => (
                                    <div className="col-md-3" key={d.id}>
                                        <a href={`/club/${d.id}`}>
                                            <Card className="col-md-12 body-card">
                                                <CardBody>
                                                    <CardImg className="card-img" src={`${d.logo}`} alt="Card image cap" />
                                                    <CardTitle className="card-title">{d.name}</CardTitle>
                                                    <CardText className="card-desc">berita tentang {d.name}</CardText>
                                                </CardBody>
                                            </Card>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}