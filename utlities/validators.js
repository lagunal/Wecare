const userModel = require('../Model/schemaUsers');
const coachModel = require('../Model/schemaCoaches');

exports.ValidatePassword = (pass) => {
    var validation = true;
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    const numberPattern = /[0-9]/;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    if (pass.trim().length < 5 || pass.trim().length > 10) {
        validation = false;
    } else if (!specialCharacters.test(pass) || !numberPattern.test(pass) || !uppercasePattern.test(pass) || !lowercasePattern.test(pass)) {
        validation = false;
    }
    if (validation) {
        return true;
    } else {
        let err = new Error("Password is invalid");
        err.status = 400;
        throw err;
    }
    
}

exports.ValidateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        let err = new Error("Invalid email!");
        err.status = 400;
        throw err;
    }
}

//validator email
exports.validateExistingEmail = async (email) => {
    const foundEmail = await userModel.find({ Email: email }).exec();
    if (foundEmail.length > 0) {
        let err = new Error("User already exists!");
        err.status = 409;
        throw err;
    }


}

//validator coaches existing name
exports.validateExistingName = async (name) => {
    const foundName = await coachModel.find({ Name: name }).exec();
    return foundName.length > 0;
}

exports.validateUserId = async (userId) => {
    const foundUserId = await userModel.find({ UserId: userId }).exec();
    return foundUserId.length > 0;
}

exports.validateCoachId = async (coachId) => {
    const foundCoachId = await coachModel.find({ CoachId: coachId }).exec();
    return foundCoachId.length > 0;
}