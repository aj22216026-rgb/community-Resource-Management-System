import db from '../config/db.js';
import PDFDocument from "pdfkit";
export const createPayment = async (req, res) => {
    try {
        const {
            resource_id,
            cardNumber,
            expiryDate,
            cvv,
            days,
            payment_date
        } = req.body;

        const user_id = req.user.id; // FROM TOKEN ONLY

        console.log("userID:", user_id);
        console.log("Payment Data:", req.body);

        // ✅ validation (NO user_id check from body anymore)
        if (
            !resource_id ||
            !cardNumber ||
            !expiryDate ||
            !cvv ||
            !days ||
            !payment_date
        ) {
            return res.status(400).json({
                message: "All fields required"
            });
        }

        const [resource] = await db.query(
            "SELECT price,status FROM resources WHERE id=?",
            [resource_id]
        );

        if (resource.length === 0) {
            return res.status(404).json({ message: "Resource not found" });
        }

        if (resource[0].status !== "Available") {
            return res.status(400).json({ message: "Resource not available" });
        }

        const totalAmount = resource[0].price * days;

        const [payment] = await db.query(
            `INSERT INTO payments
            (user_id, resource_id, card_number, expiry_date, cvv, days, payment_date, amount, payment_status)
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                user_id,
                resource_id,
                cardNumber,
                expiryDate,
                cvv,
                days,
                payment_date,
                totalAmount,
                "Completed"
            ]
        );

        await db.query(
            "UPDATE resources SET status='Booked' WHERE id=?",
            [resource_id]
        );

        res.status(201).json({
            success: true,
            paymentId: payment.insertId,
            totalAmount
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getPayments = async (req, res) => {
    try {

        const [payments] = await db.query(`
            SELECT
                p.*,
                u.username,
                r.name as resource_name
            FROM payments p
            JOIN users u ON p.user_id=u.id
            JOIN resources r ON p.resource_id=r.id
        `);

        res.json(payments);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// get payment for user by id
export const paymentById = async (req, res) => {
    const user_id = req.user.id;

    try {
        const [payments] = await db.query(
            `
            SELECT
                p.id,
                p.amount,
                p.days,
                p.payment_date,
                p.payment_status,
                p.card_number,
                p.is_read,
                u.username,
                u.email,
                r.name AS resource_name,
                r.type AS resource_type
            FROM payments p
            JOIN users u ON p.user_id = u.id
            JOIN resources r ON p.resource_id = r.id
            WHERE p.user_id = ?
            ORDER BY p.payment_date DESC
            `,
            [user_id]
        );

        return res.status(200).json({
            success: true,
            count: payments.length,
            payments
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};
// invoice for pdf generation



export const generateInvoice = async (req, res) => {
    const paymentId = req.params.paymentId;
    const user_id = req.user.id;

    try {
        const [rows] = await db.query(
            `
            SELECT 
                p.*,
                u.username,
                u.email,
                r.name AS resource_name,
                r.type
            FROM payments p
            JOIN users u ON p.user_id = u.id
            JOIN resources r ON p.resource_id = r.id
            WHERE p.id = ? AND p.user_id = ?
            `,
            [paymentId, user_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        const data = rows[0];

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=invoice-${paymentId}.pdf`
        );

        doc.pipe(res);

        // =========================
        // HEADER SECTION (SAA STYLE)
        // =========================
        doc.rect(0, 0, doc.page.width, 90).fill("#2563eb");

        doc
            .fillColor("#ffffff")
            .fontSize(20)
            .text("RESOURCE MANAGEMENT SYSTEM", 50, 30, {
                align: "center"
            });

        doc
            .fontSize(12)
            .text("OFFICIAL PAYMENT RECEIPT", {
                align: "center"
            });

        doc.moveDown(2);

        // RESET COLOR
        doc.fillColor("#000");

        // =========================
        // RECEIPT BOX
        // =========================
        doc
            .rect(50, 110, 500, 160)
            .stroke("#e5e7eb");

        doc
            .fontSize(12)
            .text(`Receipt No: INV-${data.id}`, 60, 130)
            .text(`Customer: ${data.username}`, 60, 150)
            .text(`Email: ${data.email}`, 60, 170)
            .text(`Resource: ${data.resource_name}`, 60, 190)
            .text(`Type: ${data.type}`, 60, 210)
            .text(`Date: ${new Date(data.payment_date).toDateString()}`, 60, 230);

        // =========================
        // STATUS BADGE
        // =========================
        const statusColor = data.payment_status === "Completed" ? "#16a34a" : "#f59e0b";

        doc
            .roundedRect(420, 130, 100, 30, 6)
            .fill(statusColor);

        doc
            .fillColor("#fff")
            .fontSize(12)
            .text(data.payment_status, 420, 138, {
                width: 100,
                align: "center"
            });

        doc.fillColor("#000");

        // =========================
        // PAYMENT DETAILS BOX
        // =========================
        doc
            .rect(50, 290, 500, 120)
            .stroke("#e5e7eb");

        doc
            .fontSize(12)
            .text("PAYMENT DETAILS", 60, 305, {
                underline: true
            });

        doc
            .fontSize(12)
            .text(`Days Booked: ${data.days}`, 60, 330)
            .text(`Amount Paid: D${data.amount}`, 60, 350)
            .text(`Payment Status: ${data.payment_status}`, 60, 370);

        // =========================
        // TOTAL BOX (RIGHT SIDE)
        // =========================
        doc
            .roundedRect(350, 320, 170, 70, 8)
            .fill("#f1f5f9");

        doc
            .fillColor("#000")
            .fontSize(12)
            .text("TOTAL PAID", 360, 330);

        doc
            .fontSize(18)
            .fillColor("#2563eb")
            .text(`D${data.amount}`, 360, 350);

        doc.fillColor("#000");

        // =========================
        // FOOTER
        // =========================
        doc
            .fontSize(10)
            .fillColor("gray")
            .text(
                "This receipt is system generated and does not require a signature.",
                50,
                450,
                { align: "center", width: 500 }
            );

        doc
            .fontSize(10)
            .fillColor("#2563eb")
            .text(
                "Thank you for using Resource Management System",
                50,
                470,
                { align: "center", width: 500 }
            );

        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const approvePayment = async (req, res) => {
    const paymentId = req.params.paymentId; 
    try {
        const [result] = await db.query(
            "UPDATE payments SET is_read='1' WHERE id=?",
            [paymentId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ message: "Payment approved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
