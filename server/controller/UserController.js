const Users = require("../model/users");
const { param } = require("../router/users");

const postUserController = async (req, res) => {
    const { firstName, lastName, email, gender, avtar, domain, available } = req.body;
    try {
        const newUser = new Users({ firstName, lastName, email, gender, avtar, domain, available });
        await newUser.save();
        res.send({
            success: true,
            message: "User successfully post"
        })
    } catch (err) {
        res.send({
            success: false,
            message: "Error in post user"
        })
        console.log(err)
    }
}
const getUserController = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    try {
        const users = await Users.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        res.send({
            success: true,
            Users: users
        });
    } catch (err) {
        res.send({
            success: false,
            message: "Error in get users",
        })
        console.log(err)
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.send({
            success: true,
            User: user
        })
    } catch (err) {
        res.send({
            success: false,
            message: "Error in get user"
        })
    }
}

const updateUserController = async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({
            success: true,
            User: user
        })
    } catch (err) {
        res.send({
            success: false,
            message: "Error updating user"
        })
    }
}

const deletUserController = async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: "User deleted successfully"
        })
    } catch (err) {
        res.send({
            success: false,
            message: "Error deleting user"
        })
    }
}

module.exports = { postUserController, getUserController, getUserByIdController, updateUserController, deletUserController }