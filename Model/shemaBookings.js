const mongoose = require('mongoose');

//Schema
const SchemaBookings = new mongoose.Schema(
    {
      BookingId: {
        type: String,
        unique: true,
        required: [true, 'Required field'],
      },
      UserId	: {
        type: String,
        required: [true, 'Required field'],
      },
      CoachId: {
        type: String,
        required: [true, 'Required field'],
      },
      AppointmentDate: {
        type: Date,
        required: true
      },
      Slot: {
        type: String,
        required: true
      }
    },
    {
      timestamps: {
        createdAt: true,
        updatedAt: true,
      },
    }
  );
  
  //Model
  const BookingModel = mongoose.model('bookings', SchemaBookings);
  
  module.exports = BookingModel;
