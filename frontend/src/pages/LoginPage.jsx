import { useState } from "react";
import { Box, Button, Input, VStack, Heading, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storage")); // <-- add this line
      toast({ title: "Login successful", status: "success" });
      navigate("/");
    } else {
      toast({ title: "Login failed", description: data.message, status: "error" });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Heading>Login</Heading>
        <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
