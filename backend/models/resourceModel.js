// import db from '../config/db.js';
import db from '../config/db.js';

export const createResourceTable=async()=>{
    const query=`CREATE TABLE resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    capacity VARCHAR(100),
    description TEXT NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error creating resources table:", err);
        } else {
            console.log("Resources table created successfully");
        }
    });
}