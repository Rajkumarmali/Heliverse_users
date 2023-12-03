const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamName: { type: String, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})
const Teams = mongoose.model('Teams', teamSchema)
module.exports = Teams