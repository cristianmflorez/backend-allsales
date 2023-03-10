const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		fs.mkdir('/tmp/products',(err)=>{
			cb(null, '/tmp/products');
		 });
	},
	filename: function (req, file, cb) {
		cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`);
	}
});

const fileFilter = (req, file, cb) => { 
	if(file.mimetype.includes('image/jpg') || file.mimetype.includes('image/jpeg') || file.mimetype.includes('image/png')){
		cb(null, true);
	} else{
		cb(null, false);
	}
};

const limits = { 
	fileSize: 1024*1024*5, 
	fieldNameSize: 50 
};

const uploadFile = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = uploadFile;