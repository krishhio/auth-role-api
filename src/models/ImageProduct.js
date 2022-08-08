import mongoose, {Schema, model, isValidObjectId} from 'mongoose'

const imageProductSchema =new Schema({
    idProduct: {
        ref:"Product",
        type: Schema.Types.ObjectId
    },
    name:{
        type:String,
        required: true
    },
    image:{
        data:Buffer,
        contentType:String
    }
},{
    timestamps: true,
    versionKey:false
});

export default model('ImageProduct', imageProductSchema);
