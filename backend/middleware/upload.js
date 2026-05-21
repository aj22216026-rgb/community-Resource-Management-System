import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {  
    cb(null, 'upload/resource-image'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename for the uploaded file
   }
 
});
// // type o f file to be uploaded
// const allowFileTypes = [/\.jpg$/, /\.jpeg$/, /\.png$/];
// const fileFilter = (req, file, cb) => {
//   const extname = allowFileTypes.test(file.originalname.toLowerCase()); 
//   const mimetype = allowFileTypes.test(file.mimetype);
//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images are allowed'));
//   }
// };


export const upload = multer({ storage: storage });