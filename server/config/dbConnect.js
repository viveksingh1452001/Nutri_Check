const mongoose = require('mongoose');
//require('dotenv').config(); // Ensure dotenv is properly configured


const con = process.env.URL;
const dbConnect = async () => {
    try {
        await mongoose.connect(con, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });

        console.log("Database connected successfully");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process on connection failure
    }
};

module.exports = dbConnect;
