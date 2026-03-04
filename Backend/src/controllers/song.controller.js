const songModel = require('../models/song.model');
const id3 = require('node-id3')

async function uploadSong(req,res) {

    const songBuffer = req.file.buffer

  const tags = id3.read(songBuffer)
    console.log(tags)
}

module.exports = {
    uploadSong
}