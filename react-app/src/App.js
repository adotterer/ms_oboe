import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Header from "./components/Header";
import Container from "./components/Container";
import Bio from "./components/Bio";
import Gallery from "./components/Gallery";
import { AudioPlayer } from "./components/AudioPlayer";
import SelectedAudioContext from "./components/context/SelectedAudioContext";
import AuthContext from "./components/context/AuthContext";
import { logout } from "./services/auth";

import { authenticate } from "./services/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState();

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
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
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
                      .then(() =>
                        console.log(
                          "logged out".padStart(20, ".").padEnd(20, ".")
                        )
                      )
                      .then(() => window.location.assign("/login"));
                  }}
                >
                  Logout
                </button>
              </Route>
              {/* <Route path="/sign-up" exact>
                <SignUpForm
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                />
              </Route> */}
              <Route path="/gallery">
                <Gallery />
              </Route>
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
        </AuthContext.Provider>
      </Container>
    </BrowserRouter>
  );
}

export default App;
