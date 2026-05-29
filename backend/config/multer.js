import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'upload/profiles';
if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) =>{
        const ext = path.extname(file.originalname);
        cb(null, `user_${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const  allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    allowed.includes(file.mimetype) ? 
        cb(null, true) 
        : cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
};

export default multer({ storage, fileFilter, limits: {fileSize: 2 * 1024 * 1024} });