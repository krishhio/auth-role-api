import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema =new Schema({
    username:{
        type: String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    roles:[
        {
            ref:"Role",
            type: Schema.Types.ObjectId
        },
    ],
},{
    timestamps:true,
    versionKey:false,
});


userSchema.statics.encryptPassword =  async (password) => {
    const salt= await bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword =  async (password, receivedPass) => {
    return  await bcrypt.compareSync(password, receivedPass)
}


export default model('User', userSchema);