const coachModel = require('../Model/schemaCoaches');
const encrypt = require('../utlities/encrypt');
const helper = require('../utlities/helpers');
const validator = require('../utlities/validators');


exports.registerCoach = async (req, res) => {
    //res.send('it is working coaches endpoint');
     if (!validator.ValidatePassword(req.body.Password)) {
        return res.status(400).json({
            message: "Password should have minimum 5 and maximum 10 characters"
        });
    }
    try {
        const coachId = await helper.generateCoachId();
        await coachModel.create({
            CoachId: coachId,
            Name: req.body.Name,
            Password: encrypt.encrypt(req.body.Password),
            Gender: req.body.Gender,
            DateOfBirth: req.body.DateOfBirth,
            MobileNumber: req.body.MobileNumber,
            Speciality: req.body.Speciality
        });
        res.status(201).json({
            message: coachId
        })
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }



}

