
import  db  from '../config/db.js';
import bcrypt from 'bcrypt';
import e from 'express';
import jwt from 'jsonwebtoken';



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
        const [result] = await db.query(
            "INSERT INTO users (username, email, tell, password) VALUES (?, ?, ?, ?)",
            [username, normalizedEmail, tell, hashPassword]
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
        const [users] = await db.query("SELECT id, username, email, tel, role FROM users");   
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }   
}
export const getUserInfo = async (req, res) => {
    const userId = req.user.id;
    try {
        const [user] = await db.query("SELECT id, username, email, role FROM users WHERE id=?", [userId]); 
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user[0]);
    } catch (error) {
        console.error("Error fetching user info:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}