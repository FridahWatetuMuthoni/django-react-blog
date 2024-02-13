import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function UseAuthContext() {
  return useContext(AuthContext);
}

export default UseAuthContext;
