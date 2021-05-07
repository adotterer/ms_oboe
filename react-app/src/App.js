import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Header from "./components/Header";
import Container from "./components/Container";
import Bio from "./components/Bio";

import { authenticate } from "./services/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <NavBar setAuthenticated={setAuthenticated} />
        <Switch>
          <Route path="/" exact>
            <Bio />
          </Route>

          <Route path="/login" exact>
            <LoginForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route path="/sign-up" exact>
            <SignUpForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <ProtectedRoute path="/users" exact authenticated={authenticated}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute
            path="/users/:userId"
            exact
            authenticated={authenticated}
          >
            <User />
          </ProtectedRoute>
          {/* <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
            <h1>My Home Page</h1>
          </ProtectedRoute> */}
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
