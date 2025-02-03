const mongoose = require('mongoose');


//validation functions
const validatorName = (val) => {
  return val.length >= 3 && val.length <= 50
};

const validatorSpeciality = (val) => {
  return val.length >= 10 && val.length <= 50
};

//Schema
const SchemaCoach = new mongoose.Schema(
    {
      CoachId: {
        type: String,
        unique: true,
        required: [true, 'Required field']
      },
      Name	: {
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
        required: [true, 'Required field'],
        enum: {
          values: ['F', 'M'],
          message: 'Should be either M or F'
        }
      },
      DateOfBirth: {
        type: Date,
        required: true
      },
      MobileNumber: {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            return value.toString().length === 10
          },
          message: '{VALUE} is not valid, should have 10 digits'
        }
      },
      Speciality: {
        type: String,
        required: true,
        validate: {
          validator: validatorSpeciality,
          message: 'should have minimum 3 and maximum 20 characters'
        }
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
  const CoachModel = mongoose.model('coaches', SchemaCoach);
  
  module.exports = CoachModel;
  


