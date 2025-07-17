import { useState } from "react";
import { Box, Button, Input, VStack, Heading, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role: "customer" }),
    });
    const data = await res.json();
    if (data.success) {
      toast({ title: "Registration successful", status: "success" });
      navigate("/login");
    } else {
      toast({ title: "Registration failed", description: data.message, status: "error" });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Heading>Register</Heading>
        <Input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button colorScheme="blue" onClick={handleRegister}>
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default RegisterPage;
