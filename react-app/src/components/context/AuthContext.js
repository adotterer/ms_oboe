import { createContext } from "react";

// export const defaultAuthContext = {
//   loggedIn: false,
// };

const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: () => {},
});

export default AuthContext;
