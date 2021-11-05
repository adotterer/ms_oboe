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
import { AudioPlayer } from "./components/AudioPlayer"; // react-app/src/components/ContentReel.js
import SelectedAudioContext, {
  defaultContext,
} from "./components/context/SelectedAudioContext";
import { logout } from "./services/auth";

import { authenticate } from "./services/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(defaultContext);

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
        <SelectedAudioContext.Provider
          value={{ selectedAudio, setSelectedAudio }}
        >
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
            <Route path="/logout" exact>
              <button
                onClick={() => {
                  logout()
                    .then((res) => console.log("logged out apparently"))
                    .then(() => {
                      window.location.assign("/login");
                    });
                }}
              >
                Logout
              </button>
            </Route>
            <Route path="/sign-up" exact>
              <SignUpForm
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            </Route>
            <Route path="/gallery">gallery</Route>
            <Route path="/audio">
              <AudioPlayer />
            </Route>
            <Route path="/video">video</Route>
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
        </SelectedAudioContext.Provider>
      </Container>
    </BrowserRouter>
  );
}

export default App;
