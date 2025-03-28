import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const SignIn = () => {
  const navigate = useNavigate();

  // Redirect if already signed in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials, please try again.');
      }

      const data = await response.json();
      console.log("Response from API:", data);  

      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userChange")); // Notify TopBar


      navigate("/home");
    } catch (err) {

      if (err.message === 'Failed to fetch') {
            setError('Network error. Please check your internet connection.');
          } else {
            setError(err.message); 
          }    }
          
  };

  return (
    <div className="signin-container" style={{marginTop:"120px"}}>
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="signin-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
        <h6>Don't have an account? <Link to="/signup">Sign up</Link></h6>
        </form>
    </div>
  );
};

export default SignIn;
