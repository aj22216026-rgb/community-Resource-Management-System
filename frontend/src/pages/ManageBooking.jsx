import React from "react";
import "../css/ManageBooking.css";
import { ArrowLeft, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

function ManageBooking() {

  const bookings = [
    {
      id: 1,
      user: "Lamin Faal",
      resource: "Football Field",
      startDate: "2026-03-20",
      endDate: "2026-03-22",
      status: "Pending",
      totalFees: "D400"
    },
    {
      id: 2,
      user: "Assan Jeng",
      resource: "Tractor",
      startDate: "2026-03-21",
      endDate: "2026-03-21",
      status: "pending",
      totalFees: "D500"
    }
    

  ];

  return (
    <div className="resource-booking">


     <div className="page-header">

  <Link to="/dashboard" className="back-nav">
    <ArrowLeft size={18} />
    <span>Back to Dashboard</span>
  </Link>

</div>

      <div className="main-booking"> 
      <h1 className="resource-heading">Manage Bookings</h1>
      <p> Review and manage all resource booking requests</p>
        <h3 className="resource-heading">Pending approval</h3>

      <table className="resource-tablefirst">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Fees</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.user}</td>
              <td>{booking.resource}</td>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>{booking.totalFees}</td>
              <td>{booking.status}</td>
              <td>
                <button className="btn-approve">
                  <Check size={16} />
                </button>

                <button className="btn-deny">
                  <X size={16} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>  



      <div className="main-approved">
      <h3 className="resource-headingsecond">All Bookings</h3>
      <p>Complete booking history</p>
      <table className="resource-table-approved">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Fees</th>
            <th>Status</th>
            <th>Book On</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.user}</td>
              <td>{booking.resource}</td>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>{booking.totalFees}</td>
              <td>{booking.bookOn}</td>
              <td>
                <button className="btn-approve">
                  <Check size={16} />
                </button>

                <button className="btn-deny">
                  <X size={16} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
  </div>

    </div>
  );
}

export default ManageBooking;