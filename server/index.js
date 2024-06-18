const express = require('express');

const app = express();
require('dotenv').config();


const port= process.env.PORT || 3000;

app.listen(port,()=>{
    try {
        console.log(`server running on port:${port}`);
        
    } catch (error) {
        console.log(error);
    }
    
})