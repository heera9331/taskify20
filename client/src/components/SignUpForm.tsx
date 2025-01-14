import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

import React from "react";
import axios from "axios";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("user > ", user);

    try {
      const response = await axios.post("https://taskify20.onrender.com/auth/register", user);
      const data = await response.data;

      if (data) {
        setSuccess(true);
        setError("");
        console.log("User signed up successfully:", data);
        navigate("/auth");
      } else {
        setError(data.error || "Something went wrong.");
        setSuccess(false);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setSuccess(false);
      console.error(err);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <div>
        <Label htmlFor="name" className="block mb-1">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="w-full"
          onChange={handleInputChange}
          name="name"
          value={user.name}
        />
      </div>
      <div>
        <Label htmlFor="userName" className="block mb-1">
          Username
        </Label>
        <Input
          id="userName"
          type="text"
          placeholder="Enter your username"
          className="w-full"
          onChange={handleInputChange}
          name="userName"
          value={user.userName}
        />
      </div>
      <div>
        <Label htmlFor="email" className="block mb-1">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full"
          onChange={handleInputChange}
          name="email"
          value={user.email}
        />
      </div>
      <div>
        <Label htmlFor="password" className="block mb-1">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          className="w-full"
          onChange={handleInputChange}
          name="password"
          value={user.password}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">Sign up successful!</p>}

      <Button variant="default" className="w-full mt-4">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
