const User = require("./userModel");
const { comparePasswords } = require("../middleware/index.js");

exports.addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({message: `Added new user`, newUser});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Unsuccessful, please try again`});
    }
};

exports.listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({message: `Fetched user list`, users});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Unsuccessful, please try again`});
    }
};

exports.logIn = async (req, res) => {
    try {
        const currentUser = await User.findOne({username: req.body.username});
        if(currentUser != null)
            await comparePasswords({plainText: req.body.password, user: currentUser}, res);
        else
            res.status(500).send({message: `User ${req.body.username} not found, please try again`});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Unsuccessful, please try again`});
    }
}

exports.updateUser = async (req, res) => {
    try {
        const result = await User.findOneAndUpdate(req.body.filter, req.body.newData, {new: true});
        res.status(200).send({message: `Updated user info`, result});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Unsuccessful, please try again`});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const delUser = req.body;
        await User.deleteOne(delUser);
        res.status(200).send({message: `Deleted user`, delUser});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Unsuccessful, please try again`});
    }
};