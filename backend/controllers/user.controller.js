
import  db  from '../config/db.js';
import bcrypt from 'bcrypt';
import e from 'express';
import jwt from 'jsonwebtoken';
import multer from '../config/multer.js';



export const createUser = async (req, res) => {
   

    const { username, email, tell, password } = req.body;

if (!username || !email || !password || !tell) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const normalizedEmail = email.toLowerCase();
        const [existingUser] = await db.query("SELECT * FROM users WHERE email=?", [normalizedEmail]);
        if(existingUser.length > 0){
            return res.status(409).json({ message: "Email already exists" });
        }   
        const hashPassword = await bcrypt.hash(password, 10);
        
        const profile_pic = req.file ? `/upload/profiles/${req.file.filename}` : null;

        const [result] = await db.query(
            "INSERT INTO users (username, email, tell, password, profile_pic) VALUES (?, ?, ?, ?, ?)",
            [
         username,
  normalizedEmail,
  tell,
  hashPassword,
  profile_pic
]
        );


        return res.status(201).json({
            message: "Account created successfully",
            result: { insertId: result.insertId }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }



};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const normalizedEmail = email.toLowerCase();
        const [user] = await db.query("SELECT * FROM users WHERE email=?", [normalizedEmail]);
        if (user.length === 0) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        const userData = user[0];
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
         const token = jwt.sign({ id: userData.id, username: userData.username, email: userData.email },
             process.env.JWT_SECRET,
              { expiresIn: '1h' });

        return res.status(200).json({ message: "Login successful", token });
    } 
    
    catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getAllUsers = async (req, res) => {
  try {

    const [users] = await db.query(`
      SELECT id, username, email, tell, role, profile_pic, created_at
       FROM users
    `);

    return res.status(200).json( users);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }
};

export const getUserInfo = async (req, res) => {

  const userId = req.user.id;

  try {

    const [user] = await db.query(`
      SELECT
        id,
        username,
        email,
        tell,
        role,
        profile_pic
      FROM users
      WHERE id=?
    `,[userId]);

    if(user.length === 0){
      return res.status(404).json({
        message:"User not found"
      });
    }

    return res.status(200).json(user[0]);

  } catch(error){

    console.error(error);

    return res.status(500).json({
      message:"Internal server error"
    });

  }
};
export const updateUserRole = async (req, res) => {

  const userId = req.params.id;
  const { role } = req.body;
  try {
    const [result] = await db.query("UPDATE users SET role=? WHERE id=?", [role, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const [result] = await db.query("DELETE FROM users WHERE id=?", [userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};