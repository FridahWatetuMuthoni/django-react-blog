import { useState } from "react";
import axios from "axios";
import UseAuthContext from "../../hooks/UseAuthContext";
import { Navigate, Link } from "react-router-dom";

function Login() {
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { setToken, token, setUsername } = UseAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(loginUser);
      const url = "http://127.0.0.1:8000/auth/";
      const response = await axios.post(url, loginUser, {
        headers: { "Content-Type": "application/json" },
        withCredential: true,
      });
      console.log(response?.data?.token);
      let token = response?.data?.token;
      setToken(token);
      localStorage.setItem("token", token);
      setSuccess(true);
      setUsername(loginUser.username);
      localStorage.setItem("username", loginUser.username);
      //clear state
      setLoginUser({ username: "", password: "" });
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No server response");
      } else if (error?.response?.status === 409) {
        setErrorMsg("Username Taken");
      } else if (error?.response?.status === 400) {
        setErrorMsg("Wrong password or username");
      } else {
        setErrorMsg("Login Failed");
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.trim()) {
      setLoginUser((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  if (success || token) {
    return <Navigate to="/" />;
  }

  return (
    <section className="shadow-lg w-50 mx-auto mt-5 p-5 rounded w">
      <h3 className="text-center my-1">Login Page</h3>
      {errorMsg && (
        <section className="alert alert-danger">
          <p className="m-0">{errorMsg}</p>
        </section>
      )}
      <form action="" method="post" className="p-5" onSubmit={handleSubmit}>
        <section>
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={loginUser.username}
            required
          />
        </section>
        <section>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={loginUser.password}
            required
          />
        </section>
        <button type="submit" className="btn btn-success my-2">
          Login
        </button>
        <p className="text-muted">
          Dont have an account <Link to="/register/">Create Account</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
