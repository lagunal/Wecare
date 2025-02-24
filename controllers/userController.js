const userModel = require('../Model/schemaUsers');
const bookingModel = require('../Model/shemaBookings');
const helper = require('../utlities/helpers');
const validator = require('../utlities/validators');
const encrypt = require('../utlities/encrypt');


exports.registerUser = async (req, res, next) => {

    const password = req.body.Password;
    const email = req.body.Email;

    try {
        const validatePassword = validator.ValidatePassword(password);
        const validateEmail = validator.ValidateEmail(email);
        const validateExistingEmail = await validator.validateExistingEmail(email)
        const Id = await helper.generateUserId();
        //Promise
        userModel.create({
                UserId: Id,
                Name: req.body.Name,
                Password: encrypt.encrypt(password),
                DateOfBirth: req.body.DateOfBirth,
                Gender: req.body.Gender,
                MobileNumber: req.body.MobileNumber,
                Email: req.body.Email,
                PinCode: req.body.PinCode,
                City: req.body.City,
                State: req.body.State,
                Country: req.body.Country
        })
        .then(result=> {
            res.status(201).json({
                message: result.UserId
            })
        })
        .catch(err => {
            err.message = "Registration failed. Please try again..."
            err.status = 400
            next(err)
        })
    } catch(err) {
        next(err);
    }

};

exports.loginUser = async (req, res) => {

    const { UserId, Password } = req.body;
    try {

        const userLogged = await userModel.find({ UserId: UserId }, 'UserId -_id Password');

        if (userLogged.length === 0) {
            return res.status(400).json({
                message: 'Incorrect user id or password'
            });
        }

        const isPwdMatch = await encrypt.compare(Password, userLogged[0].Password);

        if (!isPwdMatch) {
            return res.status(400).json({
                message: 'Incorrect user id or password'
            });
        }

        res.status(200).send(true);

    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }

};

exports.getUser = async (req, res) => {

    const userId = req.params.userId;
    try {
        const user = await userModel.find({
            UserId: userId
        })
        if (user.length > 0) {
            res.status(200).json({ user })
        } else {
            res.status(200).json({
                message: 'User Id does not exist'
            })
        }
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }

};

exports.createBooking = async (req, res) => {

    const { userId, coachId } = req.params;
    const { Slot, DateOfAppointment } = req.body;

    if (!await validator.validateUserId(userId)) {
        return res.status(400).json({
            message: 'User Id does not exist'
        })
    };
    if (!await validator.validateCoachId(coachId)) {
        return res.status(400).json({
            message: 'Coach Id does not exist'
        })
    };

    try {
        const booking = await bookingModel.create({
            BookingId: await helper.generateBookingId(),
            UserId: userId,
            CoachId: coachId,
            AppointmentDate: DateOfAppointment,
            Slot: Slot
        });
        res.status(200).send(true);

    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }

};

exports.getBookingForUser = async (req, res) => {

    const userId = req.params.userId;
    try {
        const bookings = await bookingModel.find({
            UserId: userId
        }, { _id: 0, __v: 0 });
        if (bookings.length > 0 ) {
            res.status(200).send(bookings);
        } else {
            res.status(400).json({
                message: 'Could not find any bookings'
            })
        }
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }

}