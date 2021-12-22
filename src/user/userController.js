const User = require("./userModel");

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

exports.findUser = async (req, res, next) => {
    try {
        const currentUser = await User.findOne({username: req.body.username});
        if(currentUser) {
            req.currentUser = currentUser;
            next();
        } else
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

exports.updatePassword = async (req, res) => {
    try {
        const result = await User.findOneAndUpdate({username: [req.currentUser.username]}, {password: req.body.password})
        res.status(200).send({message: `Updated password for ${req.body.username}`, state: true});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Unsuccessful, please try again`, state: false});
    }
}

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