const fs = require('fs');

let errorLogger = (err, req, res, next) => {

    const errorMessage = "" + new Date() + " " + err.message + "\n";
    fs.appendFile('ErrorLog.txt', errorMessage, (err) => { 
        if (err) console.log("error creating error log");
    });

    res.status(err.status).json({
        message: err.message
    })
};

module.exports = errorLogger;

