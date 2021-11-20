import React from "react";
import { NavLink } from "react-router-dom";

export default function Passwordresetsuccessfull() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div>
        <h2>Password Successfully Changed</h2>
        <div className="d-flex justify-content-center">
          <NavLink to="/login">Go to Login</NavLink>
        </div>
      </div>
    </div>
  );
}
