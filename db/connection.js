const mongoose = require('mongoose');

try{
    exports.connectDB = async(MONGO_URL)=>{
        const options = {
            dbName: "Olympic"
        }
        await mongoose.connect(MONGO_URL,options);
        console.log("database connection established")
    }
} catch(error){
    console.log("database error",error)
}
