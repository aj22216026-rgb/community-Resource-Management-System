
// import db from '../config/db.js';
import db from '../config/db.js';

export const createResourceTable=async()=>{
    const query=`CREATE TABLE resources (
     id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,
    resource_id INT NOT NULL,

    card_number VARCHAR(20) NOT NULL,
    expiry_date VARCHAR(10) NOT NULL,
    cvv VARCHAR(5) NOT NULL,

    days INT NOT NULL,
    payment_date DATE NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    payment_status ENUM(
        'Pending',
        'Completed',
        'Failed'
    ) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_payment_resource
        FOREIGN KEY (resource_id)
        REFERENCES resources(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);`;
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error creating resources table:", err);
        } else {
            console.log("Resources table created successfully");
        }
    });
}