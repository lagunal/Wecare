const BookingModel = require('../Model/shemaBookings');



exports.updateBooking = async (req, res) => {

    const bookingId = req.params.bookingId;
    const { Slot , DateOfAppointment } = req.body;

    try {
        const booking = await BookingModel.findOneAndUpdate({
            BookingId: bookingId
        }, 
        {
            Slot: Slot,
            AppointmentDate: DateOfAppointment
        }, 
        { new: true, runValidators: true })
        if (booking != null) {
            res.status(200).send(true);
        } else {
            res.status(400).json({
                message: 'Booking Id does not exist'
            })
        }
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
};

exports.deleteBooking = async (req, res) => {

    const bookingId = req.params.bookingId;

    try {
        const deletedBooking = await BookingModel.deleteOne({ BookingId: bookingId });
        if (deletedBooking.deletedCount === 0){
            res.status(400).json({
                message: 'Could not delete this appointment'
            })
        } else {
            res.status(200).send(true)
        }

    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
};
