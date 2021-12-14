const bcrypt = require("bcrypt");
const User = require("../user/userModel.js");

exports.hashPassword = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 16);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Unsuccessful, please try again`});
    }
};

exports.comparePasswords = async (req, res) => {
    try {
        await bcrypt.compare(req.plainText, req.user.password, function(err, result) {
            if(err)
                res.status(500).send({message: 'Something went wrong!'});

            console.log(result);
            if(result)
                res.status(200).send({message: `Successfully logged in as ${req.user.username}`});
            else
                return false;
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Something went wrong!`});
    }
};