## Hall Booking API
This API provides endpoints to manage hall booking's.

Setup:
Clone the Repository and then
```
cd hall-booking-api
```

Install Dependencies:
```
npm install
```

Create a .env file in the root directory and set the DB_URL variable to your desired directory:
```
DB_URL=mongodb://localhost:27017/YourDB
```

Start the Server:
```
npm start
```
# Postman Collection regarding Endpoints
```
https://www.postman.com/dark-crater-25789/workspace/hall-booking-api/collection/30932673-7d37e6dd-f3a8-4d94-ae19-ca5f9a311995?action=share&creator=30932673
```

# API Endpoints

Create Room
Endpoint: POST /hallBooking/createRoom

Description: Used to Create a Room.

Request Body:
```
{
    "roomName": "Sample data",
    "numberOfSeats": 3,
    "amenities": ["Projector", "Whiteboard"],
    "pricePerHour": 30
}
```

Create Bookings
Endpoint: POST /hallBooking/bookRoom

Description: Used to book a created room.

Request Body:
```
{
    "customerName": "Sample sieve",
    "roomId": "64f1b80f9e8f5c5a247dd98c",
    "date": "2024-09-04T00:00:00Z",
    "startTime": "10:00 AM",
    "endTime": "12:00 PM"
}

```

Get bookings:
Endpoint: GET /hallBooking/getBookedRooms

Description: This is used to fetch all Bookings.

Get booked customers:
Endpoint: GET /hallBooking/getBookedRooms

Description: This is used to get booked customers.

Get bookings:
Endpoint: GET /hallBooking/getRepeatedCustomers

Description: This API call is used to get Repeated customers. An repeated customer is finded by number of bookings he made.

