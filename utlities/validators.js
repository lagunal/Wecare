const userModel = require('../Model/schemaUsers');

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
    console.log(foundEmail.length);
    return foundEmail.length > 0;
}