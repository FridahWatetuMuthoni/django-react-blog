import { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phone_number: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const url = "http://127.0.0.1/auth/";
      const response = axios.post(url, { user });
      console.log(response);
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.trim()) {
      setUser((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } else return;
  };

  return (
    <section>
      <form
        action=""
        method="post"
        className="shadow-lg w-50 mx-auto mt-5 p-5 rounded"
        onSubmit={handleSubmit}
      >
        <section>
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={user.username}
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
            value={user.password}
            required
          />
        </section>
        <button type="submit" className="btn btn-success mt-2">
          Submit
        </button>
      </form>
    </section>
  );
}

export default Register;
