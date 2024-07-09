import mongoose from 'mongoose';

const schema= mongoose.Schema

const factSchema = new schema({
    username:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
    
},{timestamps: true})

const factmodel= mongoose.model('fact',factSchema)
export default factmodel