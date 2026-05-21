import React, { useEffect, useState } from "react";
import "../css/ResourceDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentForm from "./PaymentForm";

const ResourceDetail = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/resources/fetch"
        );

        const filtered = response.data.result[0].filter(
          (r) => r.type.toLowerCase() === type.toLowerCase()
        );

        setResource(filtered);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResources();
  }, [type]);

  const fetchResourceById = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/resources/${id}`
      );

      setSelectedResource(res.data.result);
      setOpenModal(true);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="resource-detail">

      <div className="page-header">
        <h1>{type} Details</h1>

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Description</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {resource.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={`http://localhost:5000/upload/${item.image}`}
                  alt={item.name}
                  className="resource-image"
                  height={50}
                  width={50}
                />
              </td>

              <td>{item.description}</td>
              <td>{item.name}</td>
              <td>{item.capacity}</td>
              <td>{item.status}</td>
              <td>D{item.price}   Per Day</td>

              <td>
                {item.status === "Available" ? (
                  <button
                    className="book-btn"
                    onClick={() =>
                      fetchResourceById(item.id)
                    }
                  >
                    Book Now
                  </button>
                ) : (
                  item.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAYMENT POPUP */}
      {openModal && selectedResource && (
        <div className="payment-overlay">

          <div className="payment-modal">

            <button
              className="close-payment"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <h2>{selectedResource.name}</h2>
            <p>D{selectedResource.price}</p>

            <PaymentForm
              resourceId={selectedResource.id}
            />

          </div>

        </div>
      )}

    </div>
  );
};

export default ResourceDetail;