import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import * as YUP from "yup";
import { useHistory } from "react-router";
import axios from "axios";
import { NavLink } from "react-router-dom";

// schema
const schema = YUP.object().shape({
  email: YUP.string().email().required("Enter a valid Email"),
});

export default function Forgotpassword() {
  const [dummy, setDummy] = useState(false);
  const history = useHistory();
  const forgot = async (values) => {
    try {
      const link = await axios.post(
        "http://localhost:3001/users/login/forgot-password",
        {
          email: values.email,
        }
      );
      console.log(link.data);
      return true;
    } catch (err) {
      setDummy(true);
      return false;
    }
  };
  return (
    <div className="d-flex justify-content-center mt-5">
      <Card>
        <Card.Header>
          <h4 className="text-center">Forgot Password</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
              const reset = await forgot(values);
              if (reset) {
                history.push("/emailsent");
              } else {
                resetForm();
              }
            }}
          >
            {() => {
              return (
                <Form>
                  {/* email */}
                  <div>
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
                  <div className="mt-3 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      Get Link
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {dummy ? (
            <div className="mt-3 d-flex justify-content-between">
              <h4 className="text-danger">User does not Exist</h4>
              <NavLink to="/register">Register Here</NavLink>
            </div>
          ) : (
            <div></div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
