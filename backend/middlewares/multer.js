import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/'); 
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension); // use the file's original extension
    }
});

const upload = multer({ storage: storage });

export default upload;
