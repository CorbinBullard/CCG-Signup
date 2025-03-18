import { Form, Layout } from "antd";
import React from "react";
import LoginCard from "../components/LoginCard";
import axios from "axios";

export default function LoginLayout() {
  const [loginForm] = Form.useForm();

  const login = async (values) => {
    console.log(values);
    // const response = await fetch("/api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify({ ...values }),
    // });
    const response = await axios.post("/api/auth/login", { ...values });
    const token = response.data.access_token;
    console.log(response);

    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    // }
  };

  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <LoginCard login={login} form={loginForm} />
    </Layout>
  );
}
