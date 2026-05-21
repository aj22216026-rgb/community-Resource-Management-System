import React, { useState } from "react";
import axios from "axios";
import {
  CreditCard,
  Calendar,
  Lock,
  Clock,
  BadgeDollarSign,
  Loader2,
} from "lucide-react";

const PaymentForm = ({ resourceId }) => {
  const [formData, setFormData] = useState({
    resource_id: resourceId,
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    days: "",
    payment_date: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!/^\d{16}$/.test(formData.cardNumber))
      newErrors.cardNumber = "Card number must be 16 digits";

    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate))
      newErrors.expiryDate = "Use MM/YY";

    if (!/^\d{3}$/.test(formData.cvv))
      newErrors.cvv = "CVV must be 3 digits";

    if (formData.days <= 0)
      newErrors.days = "Days must be greater than 0";

    if (!formData.payment_date)
      newErrors.payment_date = "Select payment date";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/payments/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Payment Successful ✅");

      setFormData({
        resource_id: resourceId,
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        days: "",
        payment_date: "",
      });

      console.log(response.data);

    } catch (error) {
      setMessage("Payment Failed ❌");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <BadgeDollarSign size={28} />
          Secure Payment
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.inputGroup}>
            <CreditCard size={18} />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          {errors.cardNumber && (
            <p style={styles.error}>{errors.cardNumber}</p>
          )}

          <div style={styles.inputGroup}>
            <Calendar size={18} />
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          {errors.expiryDate && (
            <p style={styles.error}>{errors.expiryDate}</p>
          )}

          <div style={styles.inputGroup}>
            <Lock size={18} />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          {errors.cvv && <p style={styles.error}>{errors.cvv}</p>}

          <div style={styles.inputGroup}>
            <Clock size={18} />
            <input
              type="number"
              name="days"
              placeholder="Number of Days"
              value={formData.days}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          {errors.days && <p style={styles.error}>{errors.days}</p>}

          <div style={styles.inputGroup}>
            <Calendar size={18} />
            <input
              type="date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          {errors.payment_date && (
            <p style={styles.error}>{errors.payment_date}</p>
          )}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spin" />
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </button>

          {message && (
            <p style={styles.message}>{message}</p>
          )}

        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: "100%",
  },

  card: {
    width: "80%",
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    margin: "0 auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", 
  },

  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    color: "#0f172a",
    fontWeight: "700",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "14px",
    padding: "14px",
    transition: ".3s",
    background: "#f8fafc",
  },

  input: {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "15px",
    background: "transparent",
  },

  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
  },
 
  

  error: {
    color: "#ef4444",
    fontSize: "13px",
    marginTop: "-8px",
  },

  message: {
    textAlign: "center",
    fontWeight: "700",
    marginTop: "12px",
  },
};

export default PaymentForm;