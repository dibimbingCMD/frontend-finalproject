import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import './style.scss';
import { Alert, Button, FormFeedback, Input } from 'reactstrap';

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email salah'),
  username: yup.string().min(8).required(),
  address: yup.string(),
  phone_number: yup.number(),
  password: yup.string().min(8).required(),
  retypePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});
export default function RegisterPage() {
  const handleRegister = async (e) => {
    const { email, username, address, phone_number, password } = formik.values;
    await axios
      .post('http://localhost:8000/register', {
        email,
        username,
        address,
        phone_number,
        password,
      })
      .then((res) => {
        if (res.data.message != null) {
          setMessage(res.data.message);
        }
        else{window.location = '/login';}
      })
      .catch((err) => console.error(err));
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      address: '',
      phone_number: '',
      password: '',
      retypePassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => handleRegister(),
  });
  const [formRegister, setFormRegister] = useState(formik.initialValues);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const formInput = Object.assign({}, formik.initialValues);
    setFormRegister(formInput);
  }, []);
  return (
    <div className="register-page">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <h1 className="title">Register</h1>
        <p className="desc">Welcome to Mydashboard</p>
        {message !== '' ? <Alert color='danger'>{message}</Alert> : null}
        {Object.keys(formRegister).map((key, idx) => (
          <div key={idx} className="row-input">
            <Input
              type={key === 'password' || key === 'retypePassword' ? 'password' : 'text'}
              id={key}
              name={key}
              placeholder={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
              invalid={formik.touched[key] && Boolean(formik.errors[key])}
            />
            {formik.touched[key] && Boolean(formik.errors[key]) && <FormFeedback className="error-feedback">{formik.errors[key]}</FormFeedback>}
          </div>
        ))}
        <Button className="btn-submit" type="submit">
          Create
        </Button>
        <p className="signup">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
