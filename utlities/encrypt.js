const bcrypt = require('bcryptjs');

exports.encrypt = (pass) => {
    const genSalt = bcrypt.genSaltSync();
    const hashpass = bcrypt.hashSync(pass, genSalt);
    return hashpass;
}

exports.compare = async (pwd1, pwd2) => {
    return await bcrypt.compare(pwd1, pwd2);
}