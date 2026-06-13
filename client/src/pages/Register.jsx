import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const submit = async (e) => {
    e.preventDefault();

    await api.post(
      "/auth/register",
      form
    );

    navigate("/login");
  };

  return (
    <form onSubmit={submit}>
      <h1>Register</h1>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({
            ...form,
            username:
              e.target.value,
          })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({
            ...form,
            email:
              e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password:
              e.target.value,
          })
        }
      />

      <button>
        Register
      </button>
    </form>
  );
}

export default Register;