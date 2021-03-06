import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import './style.scss';
import { Button, FormFeedback, Input } from 'reactstrap';

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email isn't valid."),
  password: yup.string().min(9).required(),
});
export default function LoginPage() {
  const handleLogin = async () => {
    const data = formik.values;
    await axios
      .post('http://localhost:8000/login', data)
      .then((res) => {
        if (res.data) {
          localStorage.setItem('access_token', res.data.token);
          window.location = `/dashboard/${res.data.payload._id}`;
        } else {
          alert("email or password is wrong!")
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => handleLogin(),
  });

  return (
    <div className="login-page">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <h1 className="title">Login</h1>
        <p className="desc">Welcome to Mydashboard</p>
        {Object.keys(formik.initialValues).map((key, idx) => (
          <div key={idx} className="row-input">
            <Input type={key === 'password' ? 'password' : 'text'} id={key} name={key} placeholder={key} value={formik.values[key]} onChange={formik.handleChange} invalid={formik.touched[key] && Boolean(formik.errors[key])} />
            {formik.touched[key] && Boolean(formik.errors[key]) && <FormFeedback className="error-feedback">{formik.errors[key]}</FormFeedback>}
          </div>
        ))}
        <Button className="btn-submit" type="submit">
          login
        </Button>
        <p className="signup">
          Don't have an account? <a href="/register">Signup</a>
        </p>
      </form>
    </div>
  );
}
