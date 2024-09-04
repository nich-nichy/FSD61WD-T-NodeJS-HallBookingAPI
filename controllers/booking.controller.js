const { Room, Booking } = require("../models/booking.model");

const createRoomFunction = async (req, res) => {
    try {
        const { roomName, numberOfSeats, amenities, pricePerHour } = req.body;
        console.log(req.body);
        const newRoom = new Room({ roomName, numberOfSeats, amenities, pricePerHour });
        await newRoom.save();
        res.status(201).json({ message: "Room created successfully", room: newRoom });
    } catch (error) {
        res.status(500).json({ message: "Error creating room", error: error.message });
    }
};

const bookRoomFunction = async (req, res) => {
    try {
        const { customerName, roomId, date, startTime, endTime } = req.body;
        const booking = new Booking({
            customerName, roomId, date, startTime, endTime, bookingDate: new Date(), bookingStatus: "Confirmed"
        });
        await booking.save();
        res.status(201).json({ message: "Room booked successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Error booking room", error: error.message });
    }
};

const getBookedRoomsFunction = async (req, res) => {
    try {
        const bookings = await Booking.aggregate([
            {
                $addFields: {
                    roomId: { $toObjectId: "$roomId" }
                }
            },
            {
                $lookup: {
                    from: "rooms",
                    localField: "roomId",
                    foreignField: "_id",
                    as: "roomDetails"
                }
            },
            { $unwind: "$roomDetails" },
            {
                $project: {
                    roomName: "$roomDetails.roomName",
                    bookedStatus: "$bookingStatus",
                    customerName: 1,
                    date: 1,
                    startTime: 1,
                    endTime: 1
                }
            }
        ]);

        console.log(bookings);

        res.status(200).json(bookings);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Error retrieving rooms", error: error.message });
    }
};

const getBookedCustomersFunction = async (req, res) => {
    try {
        const customers = await Booking.aggregate([
            {
                $lookup: {
                    from: "rooms",
                    localField: "roomId",
                    foreignField: "_id",
                    as: "roomDetails"
                }
            },
            { $unwind: "$roomDetails" },
            {
                $project: {
                    customerName: 1,
                    roomName: "$roomDetails.roomName",
                    date: 1,
                    startTime: 1,
                    endTime: 1
                }
            }
        ]);
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving customers", error: error.message });
    }
};

const getRepeatedCustomersFunction = async (req, res) => {
    try {
        const repeatedCustomers = await Booking.aggregate([
            {
                $group: {
                    _id: { customerName: "$customerName", roomId: "$roomId" },
                    bookingCount: { $sum: 1 },
                    bookings: { $push: "$$ROOT" }
                }
            },
            {
                $lookup: {
                    from: "rooms",
                    localField: "_id.roomId",
                    foreignField: "_id",
                    as: "roomDetails"
                }
            },
            { $unwind: "$roomDetails" },
            {
                $project: {
                    customerName: "$_id.customerName",
                    roomName: "$roomDetails.roomName",
                    bookingCount: 1,
                    bookingDetails: {
                        bookingId: "$bookings._id",
                        date: "$bookings.date",
                        startTime: "$bookings.startTime",
                        endTime: "$bookings.endTime",
                        bookingDate: "$bookings.bookingDate",
                        bookingStatus: "$bookings.bookingStatus"
                    }
                }
            }
        ]);
        res.status(200).json(repeatedCustomers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving repeated customers", error: error.message });
    }
};

module.exports = {
    createRoomFunction,
    bookRoomFunction,
    getBookedRoomsFunction,
    getBookedCustomersFunction,
    getRepeatedCustomersFunction
};
