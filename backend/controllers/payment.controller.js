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
        // HEADER
        // =========================
        doc
            .fontSize(22)
            .fillColor("#2563eb")
            .text("RESOURCE MANAGEMENT SYSTEM", {
                align: "center"
            });

        doc
            .fontSize(16)
            .fillColor("#000")
            .text("PAYMENT INVOICE", {
                align: "center"
            });

        doc.moveDown(2);

        // =========================
        // CUSTOMER INFO
        // =========================
        doc.fontSize(12).text(`Customer Name: ${data.username}`);
        doc.text(`Email: ${data.email}`);
        doc.text(`Invoice ID: #INV-${data.id}`);
        doc.text(`Date: ${data.payment_date}`);
        doc.moveDown();

        // =========================
        // TABLE HEADER
        // =========================
        doc
            .fontSize(12)
            .fillColor("white")
            .rect(50, doc.y, 500, 20)
            .fill("#2563eb");

        doc.fillColor("white").text("Item", 60, doc.y + 5);
        doc.text("Days", 200, doc.y);
        doc.text("Amount", 320, doc.y);
        doc.text("Status", 420, doc.y);

        doc.moveDown();

        // =========================
        // TABLE ROW
        // =========================
        doc
            .fillColor("#000")
            .text(data.resource_name, 60)
            .text(data.days.toString(), 200)
            .text(`D${data.amount}`, 320)
            .text(data.payment_status, 420);

        doc.moveDown(3);

        // =========================
        // FOOTER
        // =========================
        doc
            .fontSize(10)
            .fillColor("gray")
            .text(
                "Thank you for using our system. This is a computer generated invoice.",
                { align: "center" }
            );

        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};