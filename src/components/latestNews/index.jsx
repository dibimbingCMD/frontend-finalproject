
import React, { useEffect, useState } from "react";

import './style.scss';
import viewAll from '../../assets/img/lain-lain.jpeg';
import axios from "axios";

export default function LatestNews() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const response = await axios.get('http://localhost:8000/news')
            setData(response.data.sort((a,b)=>{
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            }));
    };
    
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="latest-news-section">
            <div className="row latest-news-row">
                {data.slice(0, 4).map((d) => (
                    <a href={`/news/${d._id}`} className="col latest-news-link" key={d._id}>
                        <div className="latest-news-img shadow">
                            <img src={`http://localhost:8000/${d.image}`} alt="epl news" loading={"lazy"} />
                        </div>
                        <div className="pt-1">{d.title}</div>
                    </a>
                ))}
                <a href="/news" className="col latest-news-link">
                    <div className="latest-news-img shadow">
                        <img src={viewAll} alt="epl news" loading={"lazy"} />
                    </div>
                    <div className="pt-1">View All</div>
                </a>
            </div>
        </div>

    )
}