const mongoose = require('mongoose');


//validation functions
const validatorName = (val) => {
  return val.length >= 3 && val.length <= 50
}

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
        required: true
      },
      Speciality: {
        type: String,
        required: true
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
  


