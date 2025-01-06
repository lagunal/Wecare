const mongoose = require('mongoose');

exports.connectDB = async () => {
                    mongoose.connect(process.env.MONGO_Conn)
                    .then(()=> {
                        console.log("Connection to WeCare DB succesfully...")
                    });
                }



