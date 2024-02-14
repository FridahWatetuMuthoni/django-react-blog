import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [username, setUsername] = useState(null);

  console.log(username);
  console.log(`token: ${token}`);

  useEffect(() => {
    const fetchProfile = async () => {
      const url = "http://localhost:8000/users/profile/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response?.data);
      setUser(response?.data);
    };

    if (username && token) {
      fetchProfile();
    }
  }, [username, token]);

  const data = {
    user,
    token,
    setToken,
    setUsername,
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthContextProvider };
