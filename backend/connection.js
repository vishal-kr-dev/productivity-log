const mongoose = require('mongoose');

const connectDB = async(mongoDBURI) => {
    try{
        const connect = await mongoose.connect(mongoDBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Mongodb connected")
    }catch(error){
        console.log("Error occured while connecting to Mongodb: ", error);
        process.exit(1);
    }
       
}

module.exports = connectDB;