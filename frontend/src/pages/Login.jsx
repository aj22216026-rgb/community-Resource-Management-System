import React, { useState } from 'react';
import "./../css/Login.css";
import { formValidation } from "../helpers/validation";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { setUser,user } = useAuth();
  console.log("User:", user);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // HANDLE INPUT
  const handleChanges = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...data,
      [name]: value
    };

    setData(updatedData);

    const errorMessage = formValidation(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: formValidation("email", data.email),
      password: formValidation("password", data.password)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err)) return;

    try {
      setLoading(true);
      setServerError("");

      const response = await axios.post(
        "http://localhost:5000/users/login",
        data
      );

      localStorage.setItem("token", response.data.token);
      const usersProfile = await axios.get("http://localhost:5000/users/profile", {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }      });
      setUser(usersProfile.data);

      navigate("/dashboard");

    } catch (error) {
      setServerError(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  //return (
    // <div className="login-container">

    //   {/* LEFT SIDE */}
    //   <div className="login-left">
   

    //   </div> //     
    //    <p>
    //       Book and manage shared resources like football fields,
    //       tractors, farms and vehicles  all in one system.
    //     </p>
    //       <div className="features">
    //       <p>⚽ Football Fields</p>
    //       <p>🚜 Tractors</p>
    //       <p>🌾 Farms</p>
    //       <p>🚗 Vehicles</p>
          
    //     </div>

    //   {/* RIGHT SIDE */}
    //   <div className="login-right">
    //     <form onSubmit={handleSubmit} className="login-form">

    return (


   


     
      <div className="login-right">
            {/* CLOSE BUTTON */}
      
        <form onSubmit={handleSubmit} className="login-form">

          <h2>Welcome Back </h2>
          <p className="sub-text">Login to your account</p>

          {serverError && <p className="error2 shake">{serverError}</p>}

        
          <label>Email</label>
          {errors.email && <p className="error-top">{errors.email}</p>}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleChanges}
          />

          {/* PASSWORD */}
          <label>Password</label>
          {errors.password && <p className="error-top">{errors.password}</p>}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChanges}
            />
            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>
          </div>

          {/* BUTTON */}
          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

               {/* GOOGLE BUTTON */}
            <button type="button" className="google-btn">
  <img 
    src="https://img.icons8.com/color/48/google-logo.png" 
    alt="Google" 
  />
  Continue with Google
</button> 
          {/* LINK */}
          <Link to="/register" className="create">
            Don’t have an account? <strong>Sign up</strong>
          </Link>

        </form>
      </div>

  
    
  );
}

export default Login;