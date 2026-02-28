const mongoose = require('mongoose');

const dbConnect = async ()=> {
 await mongoose.connect (process.env.MONGO_URI)
.then(()=>{
    console.log("Db connected")
})
}

module.exports = dbConnect;