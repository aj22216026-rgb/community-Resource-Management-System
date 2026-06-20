import db from '../config/db.js';



export const createResource = async (req, res) => {

    const { name, type, status, price, capacity, description } = req.body;
    if (!name || !price || !capacity || !description) {
        return res.status(400).json({ error: "All fields are required" });
    }



    try {
        const image = req.file ? req.file.filename : null; // Store the filename in the database
        const [query] = await db.query(
            "INSERT INTO resources (name, type, status, price, capacity, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, type, status, price, capacity, description, image]);
        return res.status(201).json({ message: "Resource created successfully", resourceId: query.insertId });
    } catch (error) {
        console.error("Error creating resource:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}
export const getAllResources = async (req, res) => {
    try {
        const resources = await db.query("SELECT * FROM resources");
        return res.status(200).json({ result: resources });
    } catch (error) {
        console.error("Error fetching resources:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getResourceById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = "SELECT * FROM resources WHERE id = ?";

        const [result] = await db.query(query, [id]);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        return res.status(200).json({
            success: true,
            result: result[0],
        });

    } catch (error) {
        console.error("server error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM resources WHERE id = ?";
        const [result] = await db.query(query, [id]);
        return res.status(200).json({ message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// update resource
export const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, status, price, capacity, description } = req.body;
        const image = req.file ? req.file.filename : null; // Store the filename in the database  
        const query = "UPDATE resources SET name = ?, type = ?, status = ?, price = ?, capacity = ?, description = ?, image = ? WHERE id = ?";
        const [result] = await db.query(query, [name, type, status, price, capacity, description, image, id]);
        return res.status(200).json({ message: "Resource updated successfully" });
    } catch (error) {
        console.error("Error updating resource:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}


export const getResourceAnalytics = async (req, res) => {
    try {
        const sql = `
            SELECT status, COUNT(*) AS total
            FROM resources
            GROUP BY status
        `;

        const [results] = await db.query(sql);

        return res.status(200).json(results);

    } catch (error) {
        console.error("Analytics Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getResourceRevenueAnalytics = async (req, res) => {
    try {
        const sql = `
            SELECT
                r.id,
                r.name,
                SUM(p.amount) AS total_amount
            FROM payments p
            JOIN resources r
                ON p.resource_id = r.id
            WHERE p.payment_status = 'Completed'
            GROUP BY r.id, r.name
            ORDER BY total_amount DESC
        `;

        const [results] = await db.query(sql);

        return res.status(200).json(results);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getTotalRevenue = async (req, res) => {
    try {
        const sql = `
            SELECT SUM(amount) AS total_revenue
            FROM payments
            WHERE payment_status = 'Completed'
        `;

        const [result] = await db.query(sql);

        return res.status(200).json({
            total_revenue: result[0].total_revenue || 0
        });

    } catch (error) {
        console.error("Revenue Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};