import { axios } from "@/lib/axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useNavigate } from "react-router-dom";
import React from "react";

const SignInForm = () => {
  const [user, setUser] = useState({
    username: "admin",
    password: "admin",
  });
  
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    console.log("sumiting");
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log(user);

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });

      console.log(response);
      const data = await response.json();
      console.log(data);
      
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      
      navigate("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    localStorage.clear();
  }, [])

  return (
    <form
      onSubmit={handleFormSubmit}
      method="post"
      className="flex flex-col gap-4"
    >
      <div>
        <Label htmlFor="username" className="block mb-1">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter username"
          className="w-full"
          value={user.username}
          onChange={handleInputChange}
          name="username"
        />
      </div>

      <div>
        <Label htmlFor="password" className="block mb-1">
          Password
        </Label>
        <Input
          name="password"
          value={user.password}
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full"
          onChange={handleInputChange}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <Button type="submit" disabled={loading} className="w-full mt-4">
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default SignInForm;
