// UN: buns ---- PW: buns123 || Atlas User DB

const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(`${process.env.URI}`);
        console.log("Connected to DB");
        
    } catch (error) {
        console.log(error);
        
    }
};
conn();