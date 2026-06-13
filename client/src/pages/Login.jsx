import { useState,
useContext } from "react";

import api from "../api/axios";

import {
  AuthContext,
} from "../context/AuthContext";

import { useNavigate }
from "react-router-dom";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res =
      await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

    login(
      res.data.user,
      res.data.accessToken
    );

    navigate("/profile");
  };

  return (
    <form onSubmit={submit}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button>
        Login
      </button>
    </form>
  );
}

export default Login;