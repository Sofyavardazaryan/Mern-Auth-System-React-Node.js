import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={submit}>
        <h1>Register</h1>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
