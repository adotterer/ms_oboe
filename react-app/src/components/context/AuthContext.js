import { createContext } from "react";

// export const defaultAuthContext = {
//   loggedIn: false,
// };

export default AuthContext = createContext({
  authenticated: false,
  setAuthenticated: () => {},
});
