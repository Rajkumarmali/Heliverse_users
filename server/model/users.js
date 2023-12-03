const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    avtar: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    available: {
        type: String,
        required: true,
    },

})
const Users = mongoose.model("Users", userSchema);
module.exports = Users;