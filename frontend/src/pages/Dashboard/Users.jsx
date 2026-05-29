import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/users.css";
import {api } from "../../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/get_users");
      console.log("Fetched users:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const changeRole = async (userId, newRole) => {
    try {
      await api.put(`/users/update_role/${userId}`, { role: newRole },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("User role updated successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }

  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/delete_user/${userId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-page">

      <div className="users-header">
        <h1>Users Management</h1>
        <p>Manage system users and roles</p>
      </div>

      <div className="table-wrapper">

        <table className="users-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>

                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        changeRole(
                          user.id,
                          e.target.value
                        )
                      }
                      className="role-select"
                    >
                      <option value="user">
                        User
                      </option>
                      <option value="admin">
                        Admin
                      </option>
                    </select>
                  </td>

                  <td>
                    {new Date(
                      user.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(user.id)
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
          </tbody> 

        </table>

      </div>

    </div>
  );
};

export default Users;