const bcrypt = require("bcrypt");

exports.hashPassword = async (req, res, next) => {
    try {
        if(req.body.newPassword) {
            req.body.password = await bcrypt.hash(req.body.newPassword, 8);
            console.log(typeof(req.body.password));
        } else {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Unsuccessful, please try again`});
    }
};

exports.comparePasswords = async (req, res, next) => {
    try {
        await bcrypt.compare(req.body.password, req.currentUser.password, function(err, result) {
            if(err)
                res.status(500).send({message: 'Something went wrong!'});

            if(result) {
                if(req.body.newPassword) {
                    next();
                } else {
                    res.status(200).send({message: `Credentials for ${req.currentUser.username} are correct`, state: true});
                }
            } else
                res.status(200).send({message: `Incorrect credentials provided, please try again`, state: false});
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Something went wrong!`});
    }
};