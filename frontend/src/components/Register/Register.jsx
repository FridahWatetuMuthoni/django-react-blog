import { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import UseAuthContext from "../../hooks/UseAuthContext";

function Register() {
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = UseAuthContext();

  if (token) {
    return <Navigate to="/home" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(registerUser);
      const url = "http://127.0.0.1:8000/users/user/";
      const response = await axios.post(url, JSON.stringify(registerUser), {
        headers: { "Content-Type": "application/json" },
        withCredential: true,
      });
      console.log(response?.data);
      setSuccess(true);
      //clear state
      setRegisterUser({ username: "", email: "", password: "" });
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No server response");
      } else if (error?.response?.status === 409) {
        setErrorMsg("Username Taken");
      } else {
        setErrorMsg("Registration Failed");
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.trim()) {
      setRegisterUser((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } else return;
  };

  if (success) {
    return <Navigate to="/" />;
  }

  return (
    <section className="shadow-lg w-50 mx-auto mt-3 p-5 rounded">
      <h3 className="text-center my-1">Registration Page</h3>
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
            value={registerUser.username}
            required
          />
        </section>
        <section>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={registerUser.email}
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
            value={registerUser.password}
            onChange={handleChange}
            required
          />
        </section>
        <button type="submit" className="btn btn-success my-3">
          Submit
        </button>
        <p className="text-muted">
          Already have an account <Link to="/login/">Login</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
