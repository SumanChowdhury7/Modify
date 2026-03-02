const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    }
},
{
    timestamps : true
})

const blacklistModel = mongoose.model('blacklistedToken', blacklistSchema);

module.exports = blacklistModel