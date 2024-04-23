import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
const [error, setError] = useState("");
const [user, setUser] = useState({ username: "", password: "" });
const navigate = useNavigate();
const signup = async () => {
    try {
        console.log("signup");
        const result = await client.signup(user);
        console.log("signup result", result);
        navigate("/Profile");
    } catch (err) {
        setError((err as { response: { data: { message: string } } }).response?.data.message);
    }
};
  return (
    <div>
      <h1>Signup</h1>
      <h3>New User? We can't wait to meet you! </h3>
      {error && <div>{error}</div>}
      <input value={user.username} onChange={(e) => setUser({
          ...user, username: e.target.value })} />
      <input value={user.password} onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      <button onClick={signup}> Signup </button>
    </div>
  );
}
