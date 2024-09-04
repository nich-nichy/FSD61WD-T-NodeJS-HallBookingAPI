const mongoose = require('mongoose');
const { Schema } = mongoose;

// Room Schema
const RoomSchema = new Schema({
    roomName: {
        type: String,
        required: true,
        unique: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    }
});

// Booking Schema
const BookingSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    bookingStatus: {
        type: String,
        enum: ['Confirmed', 'Cancelled'],
        default: 'Confirmed'
    }
});

// Creating Models
const Room = mongoose.model('Room', RoomSchema);
const Booking = mongoose.model('Booking', BookingSchema);

module.exports = {
    Room,
    Booking
};
