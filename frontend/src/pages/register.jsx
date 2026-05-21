import React, { useState } from 'react'
import "../css/Register.css"
import { formValidation } from '../helpers/validation' 
import axios from 'axios'
import { Link } from 'react-router-dom'

function Register() {

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    tell: "",
    Image: null
  })

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChanges = (e) => {
    const { name, value, files } = e.target

    const updatedData = { 
      ...data, 
      [name]: files ? files[0] : value
    }

    setData(updatedData)

    const errorMessage = formValidation(name, value, updatedData)

    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {
      username: formValidation("username", data.username, data),
      email: formValidation("email", data.email, data),
      password: formValidation("password", data.password, data),
      confirmPassword: formValidation("confirmPassword", data.confirmPassword, data),
      tell: formValidation("tell", data.tell, data),
      Image: formValidation("Image", data.Image, data)
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(err => err)) return

    try {
      setLoading(true)
      setServerError("")

      const formData = new FormData()
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })

      await axios.post('http://localhost:5000/users/create', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      alert("Account created successfully!")

    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
 

      

     
        
          <form onSubmit={handleSubmit} className="login-form">

            <h2>Create Account</h2>
            <p className="sub-text">Start your journey</p>

            {serverError && <p className="error2">{serverError}</p>}

            {/* NAME + EMAIL */}
            <div className="row">
              <div className="field">
                <label>Name</label>
                {errors.username && <p className="error-top">{errors.username}</p>}
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  value={data.username}
                  onChange={handleChanges}
                  className={errors.username ? "input-error" : ""}
                />
              </div>

              <div className="field">
                <label>Email</label>
                {errors.email && <p className="error-top">{errors.email}</p>}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={data.email}
                  onChange={handleChanges}
                  className={errors.email ? "input-error" : ""}
                />
              </div>
            </div>

            {/* PASSWORD + CONFIRM */}
            <div className="row">
              <div className="field">
                <label>Password</label>
                {errors.password && <p className="error-top">{errors.password}</p>}
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChanges}
                    className={errors.password ? "input-error" : ""}
                  />
                  <span className="eye" onClick={() => setShowPassword(!showPassword)}>👁</span>
                </div>
              </div>

              <div className="field">
                <label>Confirm</label>
                {errors.confirmPassword && <p className="error-top">{errors.confirmPassword}</p>}
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={data.confirmPassword}
                  onChange={handleChanges}
                  className={errors.confirmPassword ? "input-error" : ""}
                />
              </div>
            </div>

            {/* PHONE */}
            <label>Phone</label>
            {errors.tell && <p className="error-top">{errors.tell}</p>}
            <input
              type="tel"
              name="tell"
              placeholder="+220 7532214"
              value={data.tell}
              onChange={handleChanges}
              className={errors.tell ? "input-error" : ""}
            />

            {/* PROFILE IMAGE (AFTER PHONE) */}
            <label>Profile Picture</label>
            <div className="profile-upload">
              <label className="avatar-wrapper">
                {data.Image ? (
                  <img
                    src={URL.createObjectURL(data.Image)}
                    alt="preview"
                    className="avatar-img"
                  />
                ) : (
                  <div className="avatar-placeholder">+</div>
                )}

                <input
                  type="file"
                  name="Image"
                  accept="image/*"
                  onChange={handleChanges}
                  hidden
                />
              </label>
            </div>

            <button className="login-btn" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </button>

            <Link to="/" className="create">
              Already have an account? <strong>Login</strong>
            </Link>

          </form>
     

  
  
  )
}

export default Register
         