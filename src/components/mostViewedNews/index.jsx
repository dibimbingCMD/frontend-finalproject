
import React, { useEffect, useState } from "react";

import './style.scss';
import axios from "axios";

export default function MostViewedNews() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const response = await axios.get('http://localhost:8000/news')
            setData(response.data.slice(0, 5));
    };
    
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="col-md-3 most-viewed-col">
            <div className="row most-viewed-header">
                <h2>Most Viewed</h2>
            </div>
            {data.map((d) => (
                <a href={`/news/${d._id}`} key={d._id}>
                    <div className="row most-viewed-body">
                        <div className="col most-viewed-headline">
                            <h4 className="most-viewed-title">{d.title}</h4>
                            <p className="most-viewed-content">{d.body.length > 50 ? `${d.body.substring(0,50)}. . .` : d.body}</p>
                        </div>
                    </div>
                </a>
            ))}
        </div>

    )
}