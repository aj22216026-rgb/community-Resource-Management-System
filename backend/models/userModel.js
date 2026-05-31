import db from '../config/db.js';

export const createUsersTable= async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        tell VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        profile_pic VARCHAR(500) NULL,
        role ENUM('user','admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    try {
        await db.query(query);
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
    
};