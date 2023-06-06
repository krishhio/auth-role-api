import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';

export const signUp = async (req, res)=>{
    const {username, email, password, roles} = req.body;

    //const User.find({email})

    const pass = User.encryptPassword(password)
    
    const newUser = new User({
                        username,
                        email,
                        password: await User.encryptPassword(password)
                    })
    
    if(roles){
        const foundRoles = await Role.find({name: {$in:roles}})
        console.log(foundRoles)
        newUser.roles= foundRoles.map(role => {role._id})
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }
    console.log("Dato Registrado: ");
    const savedUser = await newUser.save();
    console.log(savedUser);
    const token= jwt.sign({id: savedUser._id},config.SECRET,{
        expiresIn: config.EXPRIRE 
    }) 
    console.log(token);
    res.status(200).json({token})
}

function printArray(myRole){
    console.log(myRole);
} 

export const signIn = async (req, res)=>{
    const userFound = await User.findOne({email: req.body.email}).populate('roles')

    if(!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword= await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid Password'})

    console.log(userFound)

    const token= jwt.sign({id: userFound._id},config.SECRET,{
        expiresIn: config.EXPRIRE 
    }) 

    res.json({token})
}