import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Changepassword from "./components/changePassword";
import Emailsent from "./components/emailSent";
import Forgotpassword from "./components/forgotPassword";
import Login from "./components/login";
import Passwordresetsuccessfull from "./components/passwordResetSuccessfull";
import Protected from "./components/protected";
import Register from "./components/register";

export const context = React.createContext();

function App() {
  const [log, setLog] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <context.Provider value={[log, setLog]}>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/protected" component={Protected} />
            <Route
              path="/users/forgot-password/:userid/:token"
              component={Changepassword}
            />
            <Route path="/forgotpassword" component={Forgotpassword} />
            <Route path="/emailsent" component={Emailsent} />
            <Route
              path="/password-reset-successfull"
              component={Passwordresetsuccessfull}
            />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </context.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
