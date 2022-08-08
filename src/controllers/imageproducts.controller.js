import mongoose from 'mongoose';
import multer from 'multer';
import ImageProduct from '../models/ImageProduct';
import Product from '../models/Product'

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    },
});

const upload = multer({
    storage:Storage
}).single('testImage')



export const addImageProductById=(req,res)=>{
    console.log('Insertando imagen')
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new ImageProduct({
                idProduct: req.params.productId,
                name: req.body.name, 
                image:{
                    data: req.file.filename,
                    contentType:'image/jpeg'
                }
            })
            newImage.save()
            res.status(200).json({"status":"image uploaded successfully"});
        }
    })
}
