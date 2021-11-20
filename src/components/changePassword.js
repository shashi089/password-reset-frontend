import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import * as YUP from "yup";

// schema
const schema = YUP.object().shape({
  password: YUP.string().min(5, "password should be more than 4 characters"),
});

export default function Changepassword() {
  const history = useHistory();
  const { userid, token } = useParams();
  console.log(userid);

  //   states
  const [password, setPassword] = useState("");
  const [confirm_password, setPassword1] = useState("");
  const [match, setMatch] = useState(false);
  const [btnState, setBtnstate] = useState(true);
  const [main, setMain] = useState(false);
  const [dummy, setDummy] = useState(true);

  //   handle change
  const handleChange = ({ target: { name, value } }) => {
    if (name === "password") {
      setPassword(value);
      if (confirm_password === value) setBtnstate(false);
      else setBtnstate(true);
    }
    if (name === "confirm_password") {
      setPassword1(value);
      if (password !== value) setMatch(true);
      else setMatch(false);
      if (password === value) setBtnstate(false);
      else setBtnstate(true);
    }
    if (value.length === 0) setBtnstate(true);
  };

  const checkLink = async () => {
    try {
      await axios.get(
        `http://localhost:3001/users/forgot-password/${userid}/${token}`
      );
      setDummy(false);
      setMain(true);
    } catch (err) {
      setDummy(true);
      setMain(true);
    }
  };
  console.log(dummy);
  useEffect(() => {
    checkLink();
  });

  const resetPassword = async () => {
    try {
      const link = await axios.post(
        `http://localhost:3001/users/forgot-password/${userid}/${token}`,
        {
          password: password,
          confirm_password: confirm_password,
        }
      );
      console.log(link);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  return (
    <div className="d-flex justify-content-center mt-5">
      {main ? (
        <>
          {dummy ? (
            <div>
              <h2>Your link is broken</h2>
            </div>
          ) : (
            <Card>
              <Card.Header>
                <h4 className="text-center">Reset Password</h4>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    password: "",
                    confirm_password: "",
                  }}
                  validationSchema={schema}
                  onSubmit={async (values, { resetForm }) => {
                    const reset = await resetPassword();
                    if (reset) {
                      history.push("/password-reset-successfull");
                      console.log("hi");
                    }
                  }}
                >
                  {() => {
                    return (
                      <Form>
                        <div>
                          {/* password */}
                          <div>
                            <label>Password</label>
                            <Field
                              className="form-control"
                              type="password"
                              name="password"
                              component="input"
                              value={password}
                              onChange={handleChange}
                            />
                            <div>
                              <ErrorMessage name="password" />
                            </div>
                          </div>
                          {/* confirm password */}
                          <div className="mt-3">
                            <label>Confirm Password</label>
                            <Field
                              className="form-control"
                              type="password"
                              name="confirm_password"
                              value={confirm_password}
                              component="input"
                              onChange={handleChange}
                            />
                            {match ? (
                              <div>Password Should Match</div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 d-flex justify-content-center">
                          <button
                            className="btn btn-primary"
                            disabled={btnState}
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Card.Body>
            </Card>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
