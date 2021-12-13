const User = require("./userModel");

exports.addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({message: `Added new user`, newUser});
    } catch (error) {
        console.log(error);
    }
};

exports.listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({message: `Fetched user list`, users});
    } catch (error) {
        console.log(error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const result = await User.findOneAndUpdate(req.body.filter, req.body.newData, {new: true});
        res.status(200).send({message: `Updated user info`, result});
    } catch (error) {
        console.log(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const delUser = req.body;
        await User.deleteOne(delUser);
        res.status(200).send({message: `Deleted user`, delUser});
    } catch (error) {
        console.log(error);
    }
};