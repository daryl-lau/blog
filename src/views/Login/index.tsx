import React, { useState } from "react";
import { url } from "@/api/api";
import "./index.less";

const Login: React.FC = () => {
  const login = () => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    fetch(`${url}/login`, {
      method: "POST",
      body: formData,
    });
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>登录</button>
    </div>
  );
};

export default Login;
