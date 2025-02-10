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

