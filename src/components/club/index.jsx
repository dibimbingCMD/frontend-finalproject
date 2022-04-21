
import React, { useEffect, useState } from "react";

import './style.scss'
const clubs = require('../../clubs.json');

export default function Clubs() {
    const [data, setData] = useState([]);
    const getData = () => {
        setData(clubs.clubs)
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <section className="pb-4 pt-4">
                <div className="d-flex mb-2 clubs-header">
                    <h2>clubs</h2>
                </div>
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {data.map((d) => (
                        <a href={`/club/${d.name}`}className="col text-center clubs-link" key={d._id}>
                            <div className="clubs-img">
                                <img src={`${d.logo}`} alt="" loading={"lazy"} />
                            </div>
                            <div className="pt-1">{d.name}</div>
                        </a>
                    ))}
                </div>
            </section>
        </>

    )
}