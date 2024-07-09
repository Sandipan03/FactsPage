import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const schema= mongoose.Schema 

const userSchema = new schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})
userSchema.statics.signup = async function (email,fullname,username,password){
    if (!email || !fullname || !username || !password){
        throw new Error('Please fill all fields')
    }
    if (!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }
    const exists_email = await this.findOne({email})
    if (exists_email){
        throw Error('Email already in use')
    }
    const exists_username= await this.findOne({username})
    if (exists_username){
        throw Error('Username already exists')
    }
    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const user= await this.create({email,fullname,username,password:hash})
    return user
}
userSchema.statics.update= async function (id,email,fullname){

    if (!email || !fullname  ){
        throw new Error('Please fill all fields')
    }
    if (!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
    const user= await this.findById(id)
    if (!user){
        throw Error('User not found')
    }
    const oldmail= user.email
    
    if (oldmail!==email){
        const exists_email = await this.findOne({email})
        if (exists_email){
            throw Error('Email already in use')
        }
    }
    
    const updateduser=await this.findByIdAndUpdate({_id:id},{
        email,
        fullname
    
    })
    return updateduser
}
userSchema.statics.login= async function (email,password){
    if (!email || !password){
        throw Error('Please fill all fields')
    }
    const user= await this.findOne({email})
    if (!user){
        throw Error('No user with this email')
    }
    const match = await bcrypt.compare(password,user.password)
    if (!match){
        throw Error('Incorrect password')
    }
    return user
}
const usermodel = mongoose.model('user',userSchema)
export default usermodel