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
