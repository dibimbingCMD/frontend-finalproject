import React, {useState, useEffect} from "react";
import axios from "axios";


import './style.scss'
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar";
import { useParams } from "react-router-dom";

export default function DashboardPage() {
    const params = useParams();
    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const handleCreate = () => {
        window.location = `/submit/${params._id}`
    };
    const handleDelete = async (_id) => {
        await axios.delete(`http://localhost:8000/news/${_id}`)
            .then(() =>{
                const updatedData = data.filter(v => v._id !== _id);
                setData(updatedData);
            })
            .catch((err) => console.error(err));
    };
    const getData = async () => {
        const response = await axios.get(`http://localhost:8000/dashboard/${params._id}`)
        setData(response.data.sort((a,b)=>{
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }));

    };

    useEffect(() => {
        const listHeader = ['No', 'Title', 'Body', 'Category', 'Club', 'Action'];
        setHeader(listHeader);
        getData();
    }, []);
    console.log(data);
    return(
        <div className="container-xxl px-md-5 bg-white shadow-lg dashboard-body">
            <Navbar/>
            <Button className="add-data-button" onClick={() => handleCreate()}><FontAwesomeIcon icon={faPlus}/></Button>
            <div className="col">
                <div className="col product-list">
                    <Table>
                        <thead>
                            <tr>
                                {header.map((h, idx) => (
                                    <th key={idx}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="body-table">
                            {data.map((d, idx) => (
                                <tr key={idx}>
                                    <th scope = "row">
                                        {idx + 1}
                                    </th>
                                        <td><a href={`/news/${d._id}`} target="_blank" rel="noopener noreferrer">{d.title}</a></td>
                                        <td>{d.body.length > 100 ? `${d.body.substring(0,25)}. . .` : d.body}</td>
                                        <td>{d.category.length > 1 ? d.category.join(", ") : d.category}</td>
                                        <td>{d.club.length > 1 ? d.club.join(", ") : d.club}</td>
                                    <td>

                                        <Button className="action-button" size="sm" color="danger" onClick={() => window.confirm("Are you sure?")? handleDelete(d._id) : null}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}