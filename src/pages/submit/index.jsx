import React, { useEffect, useState } from "react";
import axios from "axios";

import './style.scss'
import { Button, Form, Label, Input } from "reactstrap";
import { useParams } from "react-router-dom";
const clubs = require('../../clubs.json')

export default function SubmitPage() {
    const params = useParams();
    const [data, setData] = useState([]);
    const [club, setClub] = useState([]);


    const getClub = () => {
        setClub(clubs.clubs)
    };
    const getData = async () => {
        const response = await axios.get(`http://localhost:8000/news/${params._id}`)
        setData(response.data);
    };
    const initialFormValue = {
        image: "",
        title: "",
        body: "",
        category: "",
        club: "",
        createdBy: params._id
    };

    const [form, setForm] = useState(initialFormValue);

    useEffect(() => {
        getClub();
        getData();
    }, [data]);

    const createData = async () => {
        let formData = new FormData();
        formData.append('image', form.image);
        formData.append('title', form.title);
        formData.append('body', form.body);
        formData.append('category', form.category);
        formData.append('club', form.club);
        formData.append('createdBy', form.createdBy);
        await axios.post(`http://localhost:8000/news/${params._id}`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        })
            .then((res) => {
                window.location = `/news/${res.data._id}`;
            })
            .catch((err) => console.error(err));
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        return createData();

    };
    console.log(form.club);
    return (
        <>
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold">Submit news</h1>
                <div className="cccol-lg-6 mx-auto">
                    <p className="lead">Share your knowledge about epl</p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-8">
                    <Form action="/submit-news" encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-12">
                                <Label htmlFor="image" className="form-label">header</Label>
                                <Input type="file" className="form-control" name="image" accept="image/*"
                                    onChange={(e) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            image: e.target.files[0]
                                        }))
                                    }} />
                            </div>
                            <div className="col-12">
                                <Label htmlFor="title" className="form-label">title</Label>
                                <Input type="text" name="title" id="title"
                                    value={form.title}
                                    onChange={(e) => setForm((prev) => ({
                                        ...prev,
                                        title: e.target.value
                                    }))} />
                            </div>
                            <div className="col-12">
                                <Label htmlFor="body" className="form-label">body</Label>
                                <textarea type="text" name="body" id="body" className="form-control" cols={30} row={4}
                                    value={form.body}
                                    onChange={(e) => setForm((prev) => ({
                                        ...prev,
                                        body: e.target.value
                                    }))} />
                            </div>
                            <div className="col-12">
                                <Label htmlFor="category" className="form-label">category</Label>
                                <Input type="text" name="category" id="category"
                                    value={form.category}
                                    onChange={(e) => setForm((prev) => ({
                                        ...prev,
                                        category: e.target.value
                                    }))} />
                            </div>
                            <div className="col-12">
                                <Label htmlFor="club" className="form-label">club</Label>
                                <select
                                    onChange={(e) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            club: e.target.value
                                        }))
                                    }} className="form-select form-control" name="club" aria-label="club">
                                    <option value=""> Choose Related Club</option>
                                    {club.map((c) => (
                                        <option value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12">
                                <Button type="submit" className="btn btn-primary" id="addNews">submit news</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}