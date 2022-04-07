
import React, { useEffect, useState } from "react";

import './style.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "reactstrap";
const db = require('../../db.json')

export default function Navbar({handleHome, handleClub, handleCategory}) {
    const [club, setClub] = useState([]);
    const getClub = () => {
        setClub(db.clubs)
    };
    const category = [];
    db.news.map((d) => d.category.map((dd) => {if (!category.includes(dd)){category.push(dd)}}))
    
    useEffect(() => {
        getClub();
    }, []);
    console.log(category);
    return (
        <>
            <div className="nav">
                <div className="nav-container">
                    <div className="items">
                        <h4 className="logo"> EPL NEWS</h4>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li className="club-menu">
                                <a href="/club" onClick={() => handleClub()}>Club</a>
                                <ul className="dropdown-club">
                                    {club.map((d) => (
                                        <li className="club-list" key={d.id}>
                                            <a href={`/club/${d.id}`}>{d.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="club-menu">
                                <a href="/category" onClick={() => handleCategory()}>Category</a>
                                <ul className="dropdown-club">
                                    {category.map((d,idx) => (
                                        <li className="club-list" key={idx}>
                                            <a href={`/category/${d}`}>{d}</a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="search-section">
                        <ul>
                            <li className="search-icon">
                                <input type="search" placeholder="Search" />
                                <label className="icon">
                                    <span><FontAwesomeIcon icon={faSearch} className="faSearch"/></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>

    )
}