const bcrypt = require('bcryptjs');

exports.encrypt = (pass) => {
    const genSalt = bcrypt.genSaltSync();
    const hashpass = bcrypt.hashSync(pass, genSalt);
    return hashpass;
}

