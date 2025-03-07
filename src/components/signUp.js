import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => { 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Bad Request: Please check your input.");
        } else if (response.status === 409) {
          throw new Error("Username or email already exists.");
        } else {
          throw new Error("Signup failed. Please try again.");
        }
            }

      const data = await response.json();
      
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect to home page
      navigate("/home");
    } catch (err) {
      setError(err.message);
      console.error("Signup error:", err); 

    }
  };

  return (
    <div className="signup-container" style={{marginTop:"120px"}}>
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
