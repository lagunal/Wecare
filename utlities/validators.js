const userModel = require('../Model/schemaUsers');
const coachModel = require('../Model/schemaCoaches');

exports.ValidatePassword = (pass) => {
    if (pass.trim().length < 5 || pass.trim().length > 10) {
        return false;
    }
    return true;
}

exports.ValidateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//validator email
exports.validateExistingEmail = async (email) => {
    const foundEmail = await userModel.find({ Email: email }).exec();
    return foundEmail.length > 0;
}

//validator coaches existing name
exports.validateExistingName = async (name) => {
    const foundName = await coachModel.find({ Name: name }).exec();
    return foundName.length > 0;
}

