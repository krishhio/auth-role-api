import {Schema, model} from 'mongoose'

const productSchema =new Schema({
    name: String,
    category:String,
    price:Number,
    deleted: Boolean
},{
    timestamps: true,
    versionKey:false
});

export default model('Product', productSchema);



/*
name
:
"Cereal Nesquik"
category
:
"food"
price
:
54.5
imgURL
:
"https://www.chedraui.com.mx/medias/7501008042953-00-CH1200Wx1200H?cont..."
deleted
:
false
createdAt
:
2021-12-06T06:43:11.724+00:00
updatedAt
:
2021-12-06T06:43:11.724+00:*/