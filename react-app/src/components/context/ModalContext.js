import { createContext } from "react";

const ModalContext = createContext({
  open: false,
  setOpen: () => {},
});

export default ModalContext;
