import React, { useState, useEffect } from 'react'
import "../../css/Resource.css"
import axios from 'axios';
import { ArrowLeft, Pen, Trash, Plus} from 'lucide-react';
import { Link } from "react-router-dom";
import ResourceForm from "./ResourceForm";
import {api} from "../../api/axios";

function Resource() {
    const [openModal, setOpenModal] = useState(false);
    const [resources, setResources] = useState([])
    
    useEffect(() => {
fetchResources();
    }, [])

    const fetchResources = async () => {        
        try {
            const response = await api.get("/resources/fetch");
            console.log("Fetched resources:", response.data);
            setResources(response.data.result[0]);
        } catch (error) {
            console.error("Error fetching resources:", error);
        }   
    };
    
  


    const deleteResource = async (rId) => {
        try {
          await api.delete(`/resources/delete/${rId}`,{     
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          });
          alert("Resource deleted successfully");
          // fetchResources();
        } catch (error) {
          console.error("Error deleting resource:", error);
        }
        };
        


    return (

           
            
            <div className="resource-header-top">

             
        <Link to="/dashboard" className="nav back-nav">
                        <ArrowLeft size={18} />
                        Back to Dashboard
                      </Link>


                <div className="">
                <h1 className="resource-heading">Manage Resources</h1>
                <p> Add, edit, and manage all community resources</p>
                <div className="resource-header">
                
                <button
  className="back-dashboardl"
  onClick={() => setOpenModal(true)}
>
  <Plus size={20} />
  <span>Add New Resource</span>
</button>  </div>
                </div>
         
            <div className="main-content">
                <div className="resource-summary">
                    <h4>All Resource</h4>
                    <p>Total: {resources.length} resources</p>
                </div>
            <table className="resource-table">

             <thead>
             <tr>
             <th>Image</th>
             <th>Name</th>
              <th>Type</th>
               <th>Status</th>
              <th>Price/Day</th>
              <th>Capacity</th>
               <th>Action</th>
              </tr>
            </thead>
                <tbody>
                    {resources && resources.map((resource) => (
                        <tr key={resource.id}>
                            <td>
                                <div className="resource-info">
                                    <img src={`http://localhost:5000/upload/resource-image/${resource.image}`} alt={resource.name} className="resource-image" />
                                    
                                </div>
                            </td>
                            <td>{resource.name}</td>
                            <td>
                                
                                <span className={`status ${resource.status === 'Available' ? 'available' : resource.status === 'booked' ? 'booked' : 'Maintenance'   }`}>
                                    {resource.status}
                                </span>
                                </td>
                            <td>{resource.price}</td>
                            <td>{resource.description}</td>
                            <td>{resource.capacity}</td>
                            <td>
                                <button className='btn-edit'>
                                  <Pen size={16} />
                                </button>
 <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(user.id)
                      }
                    >
                       <Trash size={16} />
                    </button>


                            </td>
                        </tr>
                    ))} 
                </tbody>




            </table>


             </div>
{openModal && (
  <div className="resource-modal-overlay">
    <div className="resource-modal-card">
      <ResourceForm closeModal={() => setOpenModal(false)} />
    </div>
  </div>
)}

             </div>


    )
}

export default Resource