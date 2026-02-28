require("dotenv").config(); 
const app = require('./src/app');
const dbConnect = require('./src/config/database')



dbConnect()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})