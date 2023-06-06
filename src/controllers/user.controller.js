import mongoose from 'mongoose';
import User from '../models/User';


export const createUser = (req, res)=>{
    res.json('creating User')
}

export const getUsers =async (req, res)=>{
        const users = await User.find();
        res.json(users);
}