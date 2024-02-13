import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const url = "http://127.0.0.1/api/articles/";
    const data = axios.post(url, {});
    console.log(data);
  });

  const data = {
    user,
    setUser,
    token,
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthContextProvider };
