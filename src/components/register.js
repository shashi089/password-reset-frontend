import axios from "axios";
import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as YUP from "yup";
import "./css/register.css";
import { useState } from "react";

const schema = YUP.object().shape({
  name: YUP.string().required("Please enter Name"),
  email: YUP.string().email().required("Please Enter your Email"),
  password: YUP.string()
    .min(5, "Password should be greater than 4 characters")
    .required("Enter Password"),
});

export default function Register() {
  const [info, setInfo] = useState("");
  const createAccount = async (values) => {
    try {
      const response = await axios.post(
        "https://password-reset-backend-node.herokuapp.com/users/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );
      console.log(response);
      setInfo("User Registered Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card-container d-flex justify-content-center mt-5">
      <Card className="card">
        <Card.Header className="text-center">
          <h4>Create Account</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { resetForm }) => {
              createAccount(values);
              resetForm();
            }}
          >
            {() => {
              return (
                <Form className="d-flex flex-column">
                  {/* name */}
                  <div className="mb-3">
                    <label>Name</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="name"
                      component="input"
                    />
                    <div>
                      <ErrorMessage className="text-danger" name="name" />
                    </div>
                  </div>

                  {/* email */}
                  <div className="mb-3">
                    <label>Email</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="email"
                      component="input"
                    />
                    <div>
                      <ErrorMessage name="email" />
                    </div>
                  </div>

                  {/* password */}
                  <div className="mb-3">
                    <label>Password</label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      component="input"
                    />
                    <div>
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <div className="mt-2 d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <NavLink to="/login">Go to Login</NavLink>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div className="mt-3 text-center text-success">
            <h3>{info}</h3>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
