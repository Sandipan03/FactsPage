import User from '../models/usermodel.js'
import jwt from 'jsonwebtoken'

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '7d'})
}

const loginUser = async (req,res)=>{
    const {email,password}= req.body
    try{
        const user = await User.login(email,password)
        const token= createToken(user._id)
        const username= user.username
        const uid=user._id
        const fullname=user.fullname
        const mail=user.email
        res.status(200).json({uid,username,fullname,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

}
const signupUser = async (req,res)=>{
    const {email,fullname,username,password}= req.body
    try{
        const user = await User.signup(email,fullname,username,password)
        const token= createToken(user._id)
        const uid=user._id
        res.status(200).json({uid,username,fullname,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}
const updateUser = async (req,res)=>{
    const {id}= req.params
    const {email,fullname}= req.body
    try{
        const updateduser= await User.update(id,email,fullname)
        const token= createToken(updateduser._id)
        const uid=updateduser._id
        const username= updateduser.username
        res.status(200).json({uid,username,fullname,email,token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}
export {loginUser,signupUser,updateUser}