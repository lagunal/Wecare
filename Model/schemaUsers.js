const mongoose = require('mongoose');

//validation functions
const validatorName = (val) => {
    return val.length >= 3 && val.length <= 50
}
const validatorCity = (val) => {
    return val.length >= 3 && val.length <= 20
}


//Schema
const SchemaUser = new mongoose.Schema(
    {
       UserId: {
        type: String,
        unique: true,
      },
      Name: {
        type: String,
        required: [true, 'Required field'],
        validate: [validatorName, 'should have minimum 3 and maximum 50 characters']
      },
      Password: {
        type: String,
        required: [true, 'Required field'],
      },
      Gender: {
        type: String,
        required: true,
        enum: {
          values: ['F', 'M'],
          message: 'Should be either M or F'
        }
      },
      DateOfBirth: {
        type: Date,
        required: true
      },
      Email: {
        type: String,
        unique: true,
        required: true
      },
      MobileNumber: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => {
            return value.toString().length === 10
          },
          message: '{VALUE} is not valid, should have 10 digits'
        }
      },
      PinCode: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => {
            return value.toString().length === 6
          },
          message: 'should have 6 digits'
        }
      },
      City: {
        type: String,
        required: true,
        validate: [validatorCity, 'should have minimum 3 and maximum 20 characters']
      },
      State: {
        type: String,
        required: true,
        validate: [validatorCity, 'should have minimum 3 and maximum 20 characters']        
      },
      Country: {
        type: String,
        required: true,
        validate: [validatorCity, 'should have minimum 3 and maximum 20 characters']        
      },
    },
    {
      timestamps: {
        createdAt: true,
        updatedAt: true,
      },
    }
  );
  
  //Model
  const UserModel = mongoose.model('users', SchemaUser);
  
  module.exports = UserModel;
  


