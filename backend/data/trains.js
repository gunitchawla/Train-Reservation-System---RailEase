const trains = [
    // NORTH INDIA
    {
        trainNumber: '12002',
        trainName: 'Bhopal Shatabdi',
        totalSeats: 500,
        stations: [
            { name: 'Delhi', arrival: '06:00', departure: '06:15', day: 1 },
            { name: 'Mathura', arrival: '07:30', departure: '07:35', day: 1 },
            { name: 'Agra', arrival: '08:10', departure: '08:15', day: 1 },
            { name: 'Gwalior', arrival: '09:30', departure: '09:35', day: 1 },
            { name: 'Bhopal', arrival: '14:00', departure: '14:00', day: 1 }
        ]
    },
    {
        trainNumber: '12004',
        trainName: 'Lucknow Swarna Shatabdi',
        totalSeats: 600,
        stations: [
            { name: 'Delhi', arrival: '06:10', departure: '06:10', day: 1 },
            { name: 'Ghaziabad', arrival: '06:48', departure: '06:50', day: 1 },
            { name: 'Kanpur', arrival: '11:20', departure: '11:25', day: 1 },
            { name: 'Lucknow', arrival: '12:40', departure: '12:40', day: 1 }
        ]
    },
    {
        trainNumber: '12011',
        trainName: 'Kalka Shatabdi',
        totalSeats: 550,
        stations: [
            { name: 'Delhi', arrival: '07:40', departure: '07:40', day: 1 },
            { name: 'Panipat', arrival: '08:50', departure: '08:52', day: 1 },
            { name: 'Ambala', arrival: '10:20', departure: '10:25', day: 1 },
            { name: 'Chandigarh', arrival: '11:05', departure: '11:15', day: 1 },
            { name: 'Kalka', arrival: '11:50', departure: '11:50', day: 1 }
        ]
    },
    {
        trainNumber: '12055',
        trainName: 'Dehradun Jan Shatabdi',
        totalSeats: 450,
        stations: [
            { name: 'Delhi', arrival: '15:20', departure: '15:20', day: 1 },
            { name: 'Meerut', arrival: '16:40', departure: '16:42', day: 1 },
            { name: 'Dehradun', arrival: '21:10', departure: '21:10', day: 1 }
        ]
    },
    {
        trainNumber: '12424',
        trainName: 'Dibrugarh Rajdhani',
        totalSeats: 500,
        stations: [
            { name: 'Delhi', arrival: '16:20', departure: '16:20', day: 1 },
            { name: 'Kanpur', arrival: '21:05', departure: '21:10', day: 1 },
            { name: 'Prayagraj', arrival: '23:00', departure: '23:02', day: 1 },
            { name: 'Patna', arrival: '04:00', departure: '04:10', day: 2 },
            { name: 'Guwahati', arrival: '19:00', departure: '19:15', day: 2 },
            { name: 'Dibrugarh', arrival: '05:00', departure: '05:00', day: 3 }
        ]
    },
    {
        trainNumber: '14012',
        trainName: 'Rohtak Express',
        totalSeats: 300,
        stations: [
            { name: 'Delhi', arrival: '10:00', departure: '10:15', day: 1 },
            { name: 'Bahadurgarh', arrival: '11:00', departure: '11:05', day: 1 },
            { name: 'Rohtak', arrival: '12:00', departure: '12:00', day: 1 }
        ]
    },

    // WEST INDIA
    {
        trainNumber: '12951',
        trainName: 'Mumbai Rajdhani',
        totalSeats: 400,
        stations: [
            { name: 'Mumbai', arrival: '17:00', departure: '17:00', day: 1 },
            { name: 'Surat', arrival: '19:30', departure: '19:35', day: 1 },
            { name: 'Vadodara', arrival: '21:10', departure: '21:20', day: 1 },
            { name: 'Kota', arrival: '03:00', departure: '03:10', day: 2 },
            { name: 'Delhi', arrival: '08:30', departure: '08:30', day: 2 }
        ]
    },
    {
        trainNumber: '12953',
        trainName: 'August Kranti Rajdhani',
        totalSeats: 450,
        stations: [
            { name: 'Mumbai', arrival: '17:10', departure: '17:10', day: 1 },
            { name: 'Surat', arrival: '20:50', departure: '20:55', day: 1 },
            { name: 'Vadodara', arrival: '22:40', departure: '22:50', day: 1 },
            { name: 'Kota', arrival: '05:00', departure: '05:10', day: 2 },
            { name: 'Delhi', arrival: '10:55', departure: '10:55', day: 2 }
        ]
    },
    {
        trainNumber: '12216',
        trainName: 'Dee Garib Rath',
        totalSeats: 700,
        stations: [
            { name: 'Bandra', arrival: '12:00', departure: '12:00', day: 1 },
            { name: 'Surat', arrival: '15:10', departure: '15:15', day: 1 },
            { name: 'Ahmedabad', arrival: '19:00', departure: '19:10', day: 1 },
            { name: 'Jaipur', arrival: '03:00', departure: '03:10', day: 2 },
            { name: 'Delhi', arrival: '11:00', departure: '11:00', day: 2 }
        ]
    },

    // EAST INDIA
    {
        trainNumber: '12301',
        trainName: 'Howrah Rajdhani',
        totalSeats: 500,
        stations: [
            { name: 'Howrah', arrival: '16:50', departure: '16:50', day: 1 },
            { name: 'Dhanbad', arrival: '20:00', departure: '20:05', day: 1 },
            { name: 'Gaya', arrival: '22:50', departure: '22:55', day: 1 },
            { name: 'Prayagraj', arrival: '04:00', departure: '04:05', day: 2 },
            { name: 'Delhi', arrival: '10:00', departure: '10:00', day: 2 }
        ]
    },
    {
        trainNumber: '12260',
        trainName: 'Sealdah Duronto',
        totalSeats: 600,
        stations: [
            { name: 'Delhi', arrival: '19:45', departure: '19:45', day: 1 },
            { name: 'Kanpur', arrival: '00:30', departure: '00:35', day: 2 },
            { name: 'Sealdah', arrival: '12:30', departure: '12:30', day: 2 }
        ]
    },
    {
        trainNumber: '12801',
        trainName: 'Purushottam Express',
        totalSeats: 800,
        stations: [
            { name: 'Puri', arrival: '21:45', departure: '21:45', day: 1 },
            { name: 'Bhubaneswar', arrival: '22:50', departure: '22:55', day: 1 },
            { name: 'Kharagpur', arrival: '05:00', departure: '05:05', day: 2 },
            { name: 'Tata', arrival: '07:00', departure: '07:10', day: 2 },
            { name: 'Delhi', arrival: '04:00', departure: '04:00', day: 3 }
        ]
    },

    // SOUTH INDIA
    {
        trainNumber: '12626',
        trainName: 'Kerala Express',
        totalSeats: 700,
        stations: [
            { name: 'Delhi', arrival: '20:10', departure: '20:10', day: 1 },
            { name: 'Agra', arrival: '22:50', departure: '22:55', day: 1 },
            { name: 'Bhopal', arrival: '05:55', departure: '06:00', day: 2 },
            { name: 'Nagpur', arrival: '12:30', departure: '12:35', day: 2 },
            { name: 'Vijayawada', arrival: '22:00', departure: '22:15', day: 2 },
            { name: 'Trivandrum', arrival: '14:30', departure: '14:30', day: 3 }
        ]
    },
    {
        trainNumber: '12622',
        trainName: 'Tamil Nadu Express',
        totalSeats: 650,
        stations: [
            { name: 'Delhi', arrival: '21:05', departure: '21:05', day: 1 },
            { name: 'Bhopal', arrival: '06:00', departure: '06:05', day: 2 },
            { name: 'Nagpur', arrival: '12:40', departure: '12:45', day: 2 },
            { name: 'Vijayawada', arrival: '22:10', departure: '22:20', day: 2 },
            { name: 'Chennai', arrival: '06:15', departure: '06:15', day: 3 }
        ]
    },
    {
        trainNumber: '12650',
        trainName: 'Karnataka Sampark Kranti',
        totalSeats: 600,
        stations: [
            { name: 'Delhi', arrival: '08:20', departure: '08:20', day: 1 },
            { name: 'Bhopal', arrival: '18:00', departure: '18:10', day: 1 },
            { name: 'Kacheguda', arrival: '06:00', departure: '06:10', day: 2 },
            { name: 'Bangalore', arrival: '19:00', departure: '19:00', day: 2 }
        ]
    },

    // CENTRAL INDIA
    {
        trainNumber: '12156',
        trainName: 'Shan-e-Bhopal Express',
        totalSeats: 500,
        stations: [
            { name: 'Delhi', arrival: '20:40', departure: '20:40', day: 1 },
            { name: 'Agra', arrival: '23:30', departure: '23:35', day: 1 },
            { name: 'Gwalior', arrival: '01:00', departure: '01:05', day: 2 },
            { name: 'Bhopal', arrival: '06:20', departure: '06:20', day: 2 }
        ]
    }
];

module.exports = trains;
