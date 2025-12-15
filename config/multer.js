import multer from "multer";
import path from "path";

const storage=multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cb)=>{
        const uniqueName=Date.now()+"-"+file.originalname;
        cb(null,uniqueName);
    }
});

const fileFilter=(req,file,cb)=>{
    if(path.extname(file.originalname)=== '.zip'){
        cb(null,true);
    }else{
        cb(new Error('Only .zip files are allowed'),false);
    }
}

const upload=multer({
    storage,
    fileFilter,
    limits:{fileSize:20*1024*1024}//20MB
});

export default upload;
