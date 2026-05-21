import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// export const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "resources_db"
// })
// db.connect((err)=>{
//     if(err){
//         console.log("Error connecting to database",err);   
//     }else{
//         console.log("Connected to database");
//     }})

const pool= mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})  
const db=pool.promise();

db.query("SELECT 1")
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.error("Error connecting to database", err);
});
export default db;