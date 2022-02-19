import { Link, useNavigate } from "react-router-dom";
import styles from "./styles";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("")

  const nav = useNavigate()

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/api/users";
      const { data: res } = await axios.post(url, data);
      nav("/login")
      console.log(res.message);
    } catch (error) {
        if(error.response && error.response.status >= 400 && error.response.status <= 500 ) {
setError(error.response.data.message)
        }
    }
  };

  return (
    <div className={styles.Signup}>
      <div className={styles.Signup_form}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.orange_btn}>
              Sign In
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={data.firstName}
              required
              className={styles.input}
              onChange={handleChange}
            />{" "}
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName}
              required
              className={styles.input}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              required
              className={styles.input}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={data.password}
              required
              className={styles.input}
              onChange={handleChange}
            />
            {error && <div className={styles.error+msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
