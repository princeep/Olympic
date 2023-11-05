 const menRanking = require("../models/mens");
const jwt = require("jsonwebtoken");

 
exports.addMenRecord = async (req, res) => {
    try {
        const { name, dob, ranking, country, score } = req.body;
        if (!name || !dob || !ranking || !country || !score) {
            return res.status(400).json({ message: "Please enter all required information" });
        }
        const addingMenRecord = new menRanking({
            name,
            dob,
            score,
            ranking,
            country,
        });
        const addRecord = await addingMenRecord.save();
        jwt.sign({ menId: addRecord._id },process.env.secret_key,{ expiresIn: "1h" }, (error, token) => {
            if (error) {
                console.error("JWT token generation error:", error);
                return res.status(500).json({ message: "Failed to generate token" });
            }
            res.json({ message: "Record added successfully", token, addRecord });
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

 exports.getAllRecord = async(req,res) => {
    try{
       const allmens = await menRanking.find({});
       res.status(200).send(allmens)
    } catch(error){
        res.status(404).send(error);
    }
}

 exports.findMenById = async(req,res)=>{
    try{
        const _id = req.params.id;
        const findMenById =await menRanking.findById(_id);
        if(!findMenById){
            res.status(404).send({message:"man not found"});
        }
        res.status(200).send(findMenById)
    } catch(error){
        res.status(404).send(error);
    }
}


exports.deleteMenById = async(req,res)=>{
    try{
        const _id = req.params.id;
        const deletemen =await menRanking.findByIdAndDelete(_id);
        if(!deletemen){
            res.send({message:"men not found"})
        }
        res.status(200).send({message:"men deleted successfully"})
    } catch(error){
        res.status(404).send({message:"server error",error})
    }
}


exports.updateMenRanking = async(req,res) =>{
    try{
        const _id = req.params.id;
        const updatemen = await menRanking.findByIdAndUpdate(_id,{
            name:req.body.name,
            ranking:req.body.ranking,
            country:req.body.country,
            score:req.body.score
        })
        res.status(200).send({message:"update successful",updatemen});
    } catch(error){
        res.status(404).send({message:"server error",error});
    }
}


