import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const getSuffix = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${day}${getSuffix(day)} ${month} ${year}`;
};

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/payments/my-payments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPayments(res.data.payments || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const downloadInvoice = async (paymentId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/payments/invoice/${paymentId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `invoice-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("Invoice error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Payment History</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : payments.length === 0 ? (
        <p style={{ textAlign: "center" }}>No payments found</p>
      ) : (
        <div style={styles.tableWrapper}>
          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Resource</th>
                  <th>Days</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td> 
                    <td>{p.resource_name}</td>
                    <td>{p.days}</td>
                    <td>D{p.amount}</td>
                    <td>{p.payment_status}</td>
                    <td>{formatDate(p.payment_date)}</td>
                    <td>
                      <button
                        style={styles.btn}
                        onClick={() => downloadInvoice(p.id)}
                      >
                        Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    marginLeft: "250px",
    marginTop: "70px",
    minHeight: "100vh",
    background: "#f8fafc",
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#0f172a",
  },

  tableWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  card: {
    width: "100%",
    maxWidth: "1200px",
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },

  th: {
    padding: "16px",
    background: "#1e293b",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    borderBottom: "2px solid #e2e8f0",
  },

  td: {
    padding: "16px",
    borderBottom: "1px solid #e2e8f0",
    color: "#334155",
    fontSize: "14px",
  },

  row: {
    transition: "0.3s",
  },

  btn: {
    padding: "8px 10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
};

export default UserPayment;