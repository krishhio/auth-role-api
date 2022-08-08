import mongoose from 'mongoose';
import Product from '../models/Product'



export const createProduct = async (req,res) =>{

        const { name, category, price, deleted} = req.body;

        if(Object.keys(req.body).length === 0)
        {
            console.log('No hay datos')
            res.status(500).json({"error": "No Data"});
        }
        else{
            const newProduct= new Product({name, category, price, deleted});
            if(req.body.hasOwnProperty('name'))
            {
                console.log('crear producto', req.body)
                const productSaved = await newProduct.save()
                res.status(201).json(productSaved);
            }
            else{
                console.log('No existe ', req.body.name)
                res.status(500).json({"error": "No Completed"});
            }
        }
}

export const getProducts = async (req,res) =>{
    const products = await Product.find();
    res.json(products);
}
export const getProductById = async  (req,res) =>{
    try{
        if(mongoose.Types.ObjectId.isValid(req.params.productId)){
            const product = await Product.findById(req.params.productId);
            if(product== null){
                res.status(500).json({"error":"Data not found"});  
            }
            else{
                res.status(200).json(product);
            }
            
        }else{
            res.status(500).json({"error":"ID no valid"});  
        }
     }
    catch(err){
        console.log(err);
          res.status(500).json({"error":"Server Error"});
    }
}

export const getProductByCategory = async  (req,res) =>{
    try{
            const product = await Product.find({'category': req.params.productId});
            if(product== null){
                res.status(500).json({"error":"Data not found"});  
            }
            else{
                res.status(200).json(product);
            }
     }
    catch(err){
        console.log(err);
          res.status(500).json({"error":"Server Error"});
    }
}

export const updateProductById =async (req,res) =>{
    console.log('Actualizando Producto');
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new:true
    })
    res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req,res) =>{
    console.log('Borrado Producto');
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
    res.status(205).json({'deleted': true})
}

export const removeProductById = async (req,res) =>{
    console.log('Removiendo Producto');
    const rem = {'deleted': true};
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, rem, {
        new:true
    })
    res.status(200).json(updatedProduct)
}
