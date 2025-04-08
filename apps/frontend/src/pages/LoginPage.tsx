import { Form, Layout } from "antd";
import LoginCard from "../components/LoginCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginLayout() {
  const [loginForm] = Form.useForm();
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const response = await axios.post("/api/auth/login", { ...values });
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <LoginCard login={login} form={loginForm} />
    </Layout>
  );
}
