const mongoose = require('mongoose');

//Schema
const SchemaCoach = new mongoose.Schema(
    {
       CoachId: {
        type: String,
        unique: true,
        required: [true, 'Required field'],
      },
      Name	: {
        type: String,
        required: [true, 'Required field'],
      },
      Password: {
        type: String,
        required: [true, 'Required field'],
      },
      Gender: {
        type: String,
        required: [true, 'Required field'],
      },
      DateOfBirth: {
        type: Date,
        required: true
      },
      MobileNumber: {
        type: String,
        required: true
      },
      Specialty: {
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
  


