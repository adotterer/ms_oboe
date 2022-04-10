import "./index.css";
import { useState, useEffect } from "react";
import Gallery from "../src/components/Gallery";
import Bio from "../src/components/Bio";
import AuthContext from "../src/components/context/AuthContext";
import { authenticate } from "../src/services/auth";
import NavBar from "../src/components/NavBar";
import Header from "../src/components/Header";

export default function App({ Component, pageProps }) {
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
  // if (!loaded) {
  //   return null
  // }
  return (
    <div id="div__container">
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Header />
        <NavBar />
        <Component {...pageProps} />
        Node env: 
        {process.env.NODE_ENV}
      </AuthContext.Provider>
    </div>
  );
}

// const App = ({ Component, pageProps }) => (
//   <>
//
//   <h1>Hello world</h1>
//   </>
// );

// export default App;
