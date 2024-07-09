import factmodel from "../models/factmodel.js";
import mongoose from 'mongoose';

const getAllFacts = async( req,res)=>{
    try{
        const facts= await factmodel.find().sort({createdAt: -1});
        res.status(200).json(facts);
    }
    catch (error){
        res.status(404).json({error: error.message})
    }
}

const addFact = async (req,res)=>{
    const {username,title,description}= req.body;
    try{
        const fact= await factmodel.create({username,title,description})
        res.status(201).json(fact)
    }
    catch(error){
        res.status(404).json({error: error.message})
    }
}

const updateFact = async (req,res)=>{
    const {id}=req.params;
    try{
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Fact not found' })
        }
        const fact= await factmodel.findOneAndUpdate({_id:id},{
            ...req.body
        })
        if (!fact){
            return res.status(404).json({error: 'Fact not found' })
        }
        res.status(200).json(fact)
    }
    catch(error){
        res.status(404).json({error: error.message})
    }
}

export {getAllFacts,addFact,updateFact}