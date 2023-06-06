import mongoose from 'mongoose';
import multer from 'multer';
import ImageProduct from '../models/ImageProduct';
import fs from 'fs';


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
    upload(req,res,(err)=>{
       // console.log(req.body)
        if(err){
            console.log(err)
        }
        else{
            console.log('Insertando imagen: '+ req.body.name)
            console.log('Imagen a insertar:' + req.body.filename)
            var img = fs.readFileSync(req.file.path);
            var encode_img = img.toString('base64');
            const newImage = new ImageProduct({
                idProduct: req.params.productId,
                name: req.body.name, 
                image:{
                    data: encode_img,
                    contentType:'image/jpeg'
                }
            })
            newImage.save()
            res.status(200).json({"status":"image uploaded successfully"});
        }
    })
}


export const readImageProduct=async (req, res)=>{
    const idP = req.params.productId;
    console.log(idP)
    const imageProduct = await ImageProduct.findById(idP);
    console.log()
    res.status(200).json(imageProduct);
}