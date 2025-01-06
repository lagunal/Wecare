const userModel = require('../Model/schemaUsers');

// TO-DO improve the generation of the Id to the format "UI-0001"
exports.generateUserId = async () => {
    const user = await userModel.find({});
    const userLenght = user.length + 1 || 0;
    const Id = "UI-" + userLenght.toString(); 
    return Id;
};
