import React, { useState } from 'react'
import "../../css/resourceForm.css"
import axios from 'axios';
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ResourceForm({ closeModal }) {

  const navigate = useNavigate();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    type: "",
    status: "",
    price: "",
    capacity: "",
    description: "",
    image: null
  })

  const handleChanges = (e) => {
    const { name, value, files } = e.target

    if (name === "image") {
      setData((prev) => ({
        ...prev,
        image: files[0]
      }))
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("status", data.status);
      formData.append("price", data.price);
      formData.append("capacity", data.capacity);
      formData.append("description", data.description);
      formData.append("image", data.image);

      const response = await axios.post(
        "http://localhost:5000/resources/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

     setSuccess("✅ Resource added successfully!");

setTimeout(() => {
  closeModal();
  window.location.reload();
}, 1200);
      setError("");

      setData({
        name: "",
        type: "",
        status: "",
        price: "",
        capacity: "",
        description: "",
        image: null
      });

      console.log(response.data);

    } catch (error) {

      console.error(error);
      setError("❌ Failed to add resource.");
      setSuccess("");
    }
  }

  const handleCancel = () => {
  closeModal();
}

  return (
    
      <div className="resource-overlay">
      <form className="resource-form" onSubmit={handleSubmit}>

        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="close-form-btn"
          onClick={handleCancel}
        >
          <X size={20} />
        </button>

        <h2>Add New Resource</h2>
        <p>Add a new resource to the system</p>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="arrage">

          <div className="form-group">
            <label>Resource Name *</label>

            <input
              type="text"
              name="name"
              placeholder="e.g., Community Football Field A"
              value={data.name}
              onChange={handleChanges}
            />
          </div>

          <div className="form-group">
            <label>Status *</label>

            <select
              name="status"
              value={data.status}
              onChange={handleChanges}
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

        </div>

        <div className="arrage">

          <div className="form-group">
            <label>Type *</label>

            <select
              name="type"
              value={data.type}
              onChange={handleChanges}
            >
              <option value="">Select type</option>
              <option value="Football Field">Football Field</option>
              <option value="Farm">Farm</option>
              <option value="Tractor">Tractor</option>
              <option value="Mower">Mower</option>
              <option value="Car">Car</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price per Day (D) *</label>

            <input
              type="text"
              name="price"
              placeholder="D500"
              value={data.price}
              onChange={handleChanges}
            />
          </div>

        </div>

        <div className="form-group">
          <label>Capacity</label>

          <input
            type="text"
            name="capacity"
            placeholder="e.g., 22 players, 5 acres"
            value={data.capacity}
            onChange={handleChanges}
          />
        </div>

        <div className="form-group">
          <label>Description *</label>

          <textarea
            name="description"
            placeholder="Describe the resource..."
            value={data.description}
            onChange={handleChanges}
          />
        </div>

        <div className="form-group">
          <label>Upload Image</label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChanges}
          />
        </div>

        <div className="button-group">

          <button
            className="resource-button-cancel"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button className="resource-button" type="submit">
            Add Resource
          </button>

        </div>

      </form>
      </div>  

  )
}

export default ResourceForm;