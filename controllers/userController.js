const userModel = require('../Model/schemaUsers');
const helper = require('../utlities/helpers');
const validator = require('../utlities/validators');
const encrypt = require('../utlities/encrypt');


exports.registerUser = async (req, res) => {

    if (!validator.ValidatePassword(req.body.Password)) {
        res.status(400).json({
            message: "Password should have minimum 5 and maximum 10 characters"
        });
    } else if (!validator.ValidateEmail(req.body.Email)) {
        res.status(400).json({
            message: 'Email should be a valid one'
        });
    } else if (await validator.validateExistingEmail(req.body.Email)) {
        res.status(400).json({
            message: 'User exists with this email id'
        });
    } else {

        try {
            const Id = await helper.generateUserId();
            await userModel.create({
                    UserId: Id,
                    Name: req.body.Name,
                    Password: encrypt.encrypt(req.body.Password),
                    DateOfBirth: req.body.DateOfBirth,
                    Gender: req.body.Gender,
                    MobileNumber: req.body.MobileNumber,
                    Email: req.body.Email,
                    PinCode: req.body.PinCode,
                    City: req.body.City,
                    State: req.body.State,
                    Country: req.body.Country          
            });
            res.status(201).json({
                message: Id
            })
        } catch(err) {
            res.status(400).json({
                message: err.message
            })
        }
    }
    
};

exports.loginUser = async (req, res) => {

    const { UserId, Password } = req.body;

    //const userId = req.body.UserId;
    //const pwd = req.body.Password;
    
    try {
        //const encryptPwd = encrypt.encrypt(Password);
        //console.log('encryptPwd: ' , encryptPwd);

        const userLogged = await userModel.find({
            UserId: UserId
        });
        console.log(userLogged);
        console.log(userLogged.Password);

        if (!userLogged) {
            res.status(400).json({
                message: 'Incorrect user id or password'
            });
        } 
        
        const isPwdMatch = await encrypt.compare(Password, userLogged.Password);

        // if (!isPwdMatch) {
        //     res.status(400).json({
        //         message: 'Incorrect user id or password'
                
        //     });
        // }
        console.log('userLogged.Password: ' , userLogged.Password);
        console.log('encryptPwd: ' , encryptPwd);
        console.log('isPwdMatch: ' , isPwdMatch);

        res.status(200).send(true);

    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }

};


