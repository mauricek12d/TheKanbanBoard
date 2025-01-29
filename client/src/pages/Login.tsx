import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after login
import Auth from "../utils/auth";
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null); // For error messages
  const navigate = useNavigate(); // React Router navigation

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    if (!loginData.username || !loginData.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const data = await login(loginData); // Call login API
      if (data?.token) {
        Auth.login(data.token); // Save token and log in the user
        navigate("/kanban"); // Redirect to the Kanban board
      } else {
        setError("Failed to authenticate. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {/* Username Input */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={loginData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />

        {/* Password Input */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        {/* Display Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Submit Button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
