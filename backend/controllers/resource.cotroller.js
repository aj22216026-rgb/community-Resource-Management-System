import db from '../config/db.js';


export const  createResource=async (req,res)=>{ 
   
const { name,type,status,price,capacity,description } = req.body;
if (!name || !price || !capacity || !description) {
    return res.status(400).json({ error: "All fields are required" });  
}


try {
    const image = req.file ? req.file.filename : null; // Store the filename in the database
    const [query] = await db.query(
"INSERT INTO resources (name, type, status, price, capacity, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
[name, type, status, price, capacity, description, image]) ;
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