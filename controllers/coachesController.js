const coachModel = require('../Model/schemaCoaches');
const encrypt = require('../utlities/encrypt');
const helper = require('../utlities/helpers');
const validator = require('../utlities/validators');


exports.registerCoach = async (req, res) => {
     if (!validator.ValidatePassword(req.body.Password)) {
        return res.status(400).json({
            message: "Password should have minimum 5 and maximum 10 characters"
        })
    };
    if (await validator.validateExistingName(req.body.Name)) {
        return res.status(400).json({
            message: 'Coach exists with this name'
        })
    };

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
};

exports.loginCoach = async (req, res) => {

    const { CoachId, Password } = req.body;
    console.log('CoachId: ', CoachId);
    console.log('Password: ', Password); 
    try {
        const coachLogged = await coachModel.find({ CoachId: CoachId });

        if (coachLogged.length === 0) {
            return res.status(400).json({
                message: 'Incorrect coach id or password'
            })
        };
        
        const isPwdMatch = await encrypt.compare(Password, coachLogged[0].Password);

        if (!isPwdMatch) {
            return res.status(400).json({
                message: 'Incorrect coach id or password'
            })
        };
   
        res.status(200).send(true);

    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }

};

exports.getAllCoaches = async (req, res) => {
    
    try {
        const coaches = await coachModel.find({});
        if (coaches.length > 0) {
            res.status(200).json({
                coaches
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'No coaches resgistered'
            })
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
};

exports.getCoach = async (req, res) => {
    
    const coachId = req.params.coachId;
    try {
        const coach = await coachModel.find({
            CoachId: coachId
        })
        if (coach.length > 0) {
            res.status(200).json({ coach })
        } else {
            res.status(200).json({
                message: 'Coach Id does not exist'
            })
        }
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }

};