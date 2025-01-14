import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user.username || !user.password) {
      setLoading(false);
      setError("Username and Password are required.");
      return;
    }

    try {// http://67.217.245.73/myapp/auth/register
      const response = await fetch("https://taskify20.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        toast({ title: "Login successful!", type: "success" });
        navigate("/home");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to log in. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="username" className="block mb-1">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="password" className="block mb-1">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full mt-4">
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default SignInForm;
