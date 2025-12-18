const trains = [
    // --- RAJDHANI EXPRESS (Premium, Connects Capitals to Delhi) ---
    {
        trainNumber: '12951',
        trainName: 'Mumbai Rajdhani',
        totalSeats: 400,
        stations: [
            { name: 'Mumbai Central', arrival: '17:00', departure: '17:00', day: 1 },
            { name: 'Surat', arrival: '19:32', departure: '19:35', day: 1 },
            { name: 'Vadodara', arrival: '21:18', departure: '21:28', day: 1 },
            { name: 'Ratlam', arrival: '01:48', departure: '01:53', day: 2 },
            { name: 'Kota', arrival: '05:20', departure: '05:25', day: 2 },
            { name: 'New Delhi', arrival: '08:32', departure: '08:32', day: 2 }
        ]
    },
    {
        trainNumber: '12301',
        trainName: 'Howrah Rajdhani',
        totalSeats: 450,
        stations: [
            { name: 'Howrah', arrival: '16:50', departure: '16:50', day: 1 },
            { name: 'Dhanbad', arrival: '20:00', departure: '20:05', day: 1 },
            { name: 'Gaya', arrival: '22:57', departure: '23:00', day: 1 },
            { name: 'Prayagraj', arrival: '04:02', departure: '04:05', day: 2 },
            { name: 'Kanpur Central', arrival: '06:25', departure: '06:30', day: 2 },
            { name: 'New Delhi', arrival: '10:05', departure: '10:05', day: 2 }
        ]
    },
    {
        trainNumber: '12424',
        trainName: 'Dibrugarh Rajdhani',
        totalSeats: 420,
        stations: [
            { name: 'New Delhi', arrival: '16:20', departure: '16:20', day: 1 },
            { name: 'Kanpur Central', arrival: '21:02', departure: '21:07', day: 1 },
            { name: 'Prayagraj', arrival: '23:08', departure: '23:10', day: 1 },
            { name: 'Patna', arrival: '04:00', departure: '04:10', day: 2 },
            { name: 'New Jalpaiguri', arrival: '13:25', departure: '13:35', day: 2 },
            { name: 'Guwahati', arrival: '19:50', departure: '20:05', day: 2 },
            { name: 'Dibrugarh', arrival: '05:20', departure: '05:20', day: 3 }
        ]
    },
    {
        trainNumber: '12430',
        trainName: 'Bangalore Rajdhani',
        totalSeats: 450,
        stations: [
            { name: 'Hazrat Nizamuddin', arrival: '20:30', departure: '20:30', day: 1 },
            { name: 'Bhopal', arrival: '05:55', departure: '06:00', day: 2 },
            { name: 'Nagpur', arrival: '12:20', departure: '12:25', day: 2 },
            { name: 'Secunderabad', arrival: '21:30', departure: '21:45', day: 2 },
            { name: 'Bangalore City', arrival: '06:40', departure: '06:40', day: 3 }
        ]
    },
    {
        trainNumber: '12434',
        trainName: 'Chennai Rajdhani',
        totalSeats: 450,
        stations: [
            { name: 'Hazrat Nizamuddin', arrival: '15:35', departure: '15:35', day: 1 },
            { name: 'Agra Cantt', arrival: '17:30', departure: '17:32', day: 1 },
            { name: 'Gwalior', arrival: '18:53', departure: '18:55', day: 1 },
            { name: 'Bhopal', arrival: '23:30', departure: '23:40', day: 1 },
            { name: 'Nagpur', arrival: '05:10', departure: '05:15', day: 2 },
            { name: 'Vijayawada', arrival: '14:30', departure: '14:40', day: 2 },
            { name: 'Chennai Central', arrival: '20:45', departure: '20:45', day: 2 }
        ]
    },
    {
        trainNumber: '12425',
        trainName: 'Jammu Rajdhani',
        totalSeats: 400,
        stations: [
            { name: 'New Delhi', arrival: '20:40', departure: '20:40', day: 1 },
            { name: 'Ludhiana', arrival: '00:28', departure: '00:38', day: 2 },
            { name: 'Pathankot Cantt', arrival: '03:08', departure: '03:10', day: 2 },
            { name: 'Jammu Tawi', arrival: '05:00', departure: '05:00', day: 2 }
        ]
    },
    {
        trainNumber: '22691',
        trainName: 'SBC Rajdhani',
        totalSeats: 450,
        stations: [
            { name: 'Bangalore City', arrival: '20:00', departure: '20:00', day: 1 },
            { name: 'Secunderabad', arrival: '07:00', departure: '07:15', day: 2 },
            { name: 'Nagpur', arrival: '13:50', departure: '13:55', day: 2 },
            { name: 'Bhopal', arrival: '20:10', departure: '20:15', day: 2 },
            { name: 'Hazrat Nizamuddin', arrival: '05:30', departure: '05:30', day: 3 }
        ]
    },

    // --- SHATABDI EXPRESS (Day Trains, Short Distance) ---
    {
        trainNumber: '12002',
        trainName: 'Bhopal Shatabdi',
        totalSeats: 550,
        stations: [
            { name: 'New Delhi', arrival: '06:00', departure: '06:00', day: 1 },
            { name: 'Mathura', arrival: '07:19', departure: '07:20', day: 1 },
            { name: 'Agra Cantt', arrival: '07:50', departure: '07:55', day: 1 },
            { name: 'Gwalior', arrival: '09:23', departure: '09:28', day: 1 },
            { name: 'Jhansi', arrival: '10:45', departure: '10:50', day: 1 },
            { name: 'Bhopal', arrival: '14:07', departure: '14:07', day: 1 }
        ]
    },
    {
        trainNumber: '12004',
        trainName: 'Lucknow Swarna Shatabdi',
        totalSeats: 600,
        stations: [
            { name: 'New Delhi', arrival: '06:10', departure: '06:10', day: 1 },
            { name: 'Ghaziabad', arrival: '06:48', departure: '06:50', day: 1 },
            { name: 'Kanpur Central', arrival: '11:20', departure: '11:25', day: 1 },
            { name: 'Lucknow', arrival: '12:40', departure: '12:40', day: 1 }
        ]
    },
    {
        trainNumber: '12005',
        trainName: 'Kalka Shatabdi',
        totalSeats: 550,
        stations: [
            { name: 'New Delhi', arrival: '17:15', departure: '17:15', day: 1 },
            { name: 'Panipat', arrival: '18:18', departure: '18:20', day: 1 },
            { name: 'Ambala Cantt', arrival: '19:50', departure: '19:53', day: 1 },
            { name: 'Chandigarh', arrival: '20:30', departure: '20:38', day: 1 },
            { name: 'Kalka', arrival: '21:15', departure: '21:15', day: 1 }
        ]
    },
    {
        trainNumber: '12009',
        trainName: 'Mumbai Central - Ahmedabad Shatabdi',
        totalSeats: 600,
        stations: [
            { name: 'Mumbai Central', arrival: '06:20', departure: '06:20', day: 1 },
            { name: 'Surat', arrival: '09:02', departure: '09:07', day: 1 },
            { name: 'Vadodara', arrival: '10:48', departure: '10:53', day: 1 },
            { name: 'Ahmedabad', arrival: '12:40', departure: '12:40', day: 1 }
        ]
    },
    {
        trainNumber: '12015',
        trainName: 'Ajmer Shatabdi',
        totalSeats: 500,
        stations: [
            { name: 'New Delhi', arrival: '06:10', departure: '06:10', day: 1 },
            { name: 'Gurgaon', arrival: '06:48', departure: '06:50', day: 1 },
            { name: 'Jaipur', arrival: '10:40', departure: '10:45', day: 1 },
            { name: 'Ajmer', arrival: '12:55', departure: '12:55', day: 1 }
        ]
    },
    {
        trainNumber: '12028',
        trainName: 'Bangalore - Chennai Shatabdi',
        totalSeats: 550,
        stations: [
            { name: 'Bangalore City', arrival: '06:00', departure: '06:00', day: 1 },
            { name: 'Katpadi', arrival: '09:23', departure: '09:25', day: 1 },
            { name: 'Chennai Central', arrival: '11:00', departure: '11:00', day: 1 }
        ]
    },

    // --- DURONTO EXPRESS (Non-stop Point-to-Point) ---
    {
        trainNumber: '12260',
        trainName: 'Sealdah Duronto',
        totalSeats: 600,
        stations: [
            { name: 'New Delhi', arrival: '19:45', departure: '19:45', day: 1 },
            { name: 'Kanpur Central', arrival: '00:30', departure: '00:35', day: 2 },
            { name: 'Dhanbad', arrival: '08:20', departure: '08:25', day: 2 },
            { name: 'Sealdah', arrival: '12:30', departure: '12:30', day: 2 }
        ]
    },
    {
        trainNumber: '12220',
        trainName: 'Secunderabad Duronto',
        totalSeats: 550,
        stations: [
            { name: 'Lokmanya Tilak Terminus', arrival: '23:05', departure: '23:05', day: 1 },
            { name: 'Pune', arrival: '02:20', departure: '02:25', day: 2 },
            { name: 'Solapur', arrival: '05:40', departure: '05:45', day: 2 },
            { name: 'Secunderabad', arrival: '11:05', departure: '11:05', day: 2 }
        ]
    },
    {
        trainNumber: '12245',
        trainName: 'Howrah - Yesvantpur Duronto',
        totalSeats: 600,
        stations: [
            { name: 'Howrah', arrival: '10:50', departure: '10:50', day: 1 },
            { name: 'Bhubaneswar', arrival: '16:50', departure: '17:00', day: 1 },
            { name: 'Vijayawada', arrival: '04:30', departure: '04:45', day: 2 },
            { name: 'Yesvantpur', arrival: '16:00', departure: '16:00', day: 2 }
        ]
    },

    // --- POPULAR LONG DISTANCE EXPRESS TRAINS ---
    {
        trainNumber: '12626',
        trainName: 'Kerala Express',
        totalSeats: 700,
        stations: [
            { name: 'New Delhi', arrival: '20:10', departure: '20:10', day: 1 },
            { name: 'Agra Cantt', arrival: '22:50', departure: '22:55', day: 1 },
            { name: 'Bhopal', arrival: '05:55', departure: '06:00', day: 2 },
            { name: 'Nagpur', arrival: '12:30', departure: '12:35', day: 2 },
            { name: 'Vijayawada', arrival: '22:00', departure: '22:15', day: 2 },
            { name: 'Trivandrum Central', arrival: '14:30', departure: '14:30', day: 3 }
        ]
    },
    {
        trainNumber: '12622',
        trainName: 'Tamil Nadu Express',
        totalSeats: 650,
        stations: [
            { name: 'New Delhi', arrival: '21:05', departure: '21:05', day: 1 },
            { name: 'Bhopal', arrival: '06:00', departure: '06:05', day: 2 },
            { name: 'Nagpur', arrival: '12:40', departure: '12:45', day: 2 },
            { name: 'Vijayawada', arrival: '22:10', departure: '22:20', day: 2 },
            { name: 'Chennai Central', arrival: '06:15', departure: '06:15', day: 3 }
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
            { name: 'Tatanagar', arrival: '07:00', departure: '07:10', day: 2 },
            { name: 'Kanpur Central', arrival: '21:15', departure: '21:20', day: 2 },
            { name: 'New Delhi', arrival: '04:00', departure: '04:00', day: 3 }
        ]
    },
    {
        trainNumber: '12650',
        trainName: 'Karnataka Sampark Kranti',
        totalSeats: 600,
        stations: [
            { name: 'Hazrat Nizamuddin', arrival: '08:20', departure: '08:20', day: 1 },
            { name: 'Bhopal', arrival: '18:00', departure: '18:10', day: 1 },
            { name: 'Kacheguda', arrival: '06:00', departure: '06:10', day: 2 },
            { name: 'Bangalore City', arrival: '19:00', departure: '19:00', day: 2 }
        ]
    },
    {
        trainNumber: '12156',
        trainName: 'Shan-e-Bhopal Express',
        totalSeats: 500,
        stations: [
            { name: 'Hazrat Nizamuddin', arrival: '20:40', departure: '20:40', day: 1 },
            { name: 'Agra Cantt', arrival: '23:30', departure: '23:35', day: 1 },
            { name: 'Gwalior', arrival: '01:00', departure: '01:05', day: 2 },
            { name: 'Bhopal', arrival: '06:20', departure: '06:20', day: 2 }
        ]
    },
    {
        trainNumber: '11058',
        trainName: 'Amritsar Dadar Express',
        totalSeats: 600,
        stations: [
            { name: 'Amritsar', arrival: '08:50', departure: '08:50', day: 1 },
            { name: 'Jalandhar City', arrival: '10:00', departure: '10:05', day: 1 },
            { name: 'Ludhiana', arrival: '11:05', departure: '11:15', day: 1 },
            { name: 'Ambala Cantt', arrival: '13:00', departure: '13:10', day: 1 },
            { name: 'New Delhi', arrival: '16:10', departure: '16:25', day: 1 },
            { name: 'Mathura', arrival: '19:15', departure: '19:20', day: 1 },
            { name: 'Gwalior', arrival: '21:50', departure: '21:55', day: 1 },
            { name: 'Bhopal', arrival: '02:50', departure: '02:55', day: 2 },
            { name: 'Khandwa', arrival: '07:30', departure: '07:35', day: 2 },
            { name: 'Bhusaval', arrival: '09:40', departure: '09:45', day: 2 },
            { name: 'Dadar', arrival: '15:55', departure: '15:55', day: 2 }
        ]
    },
    {
        trainNumber: '12724',
        trainName: 'Telangana Express',
        totalSeats: 650,
        stations: [
            { name: 'New Delhi', arrival: '16:00', departure: '16:00', day: 1 },
            { name: 'Agra Cantt', arrival: '18:50', departure: '18:55', day: 1 },
            { name: 'Bhopal', arrival: '02:00', departure: '02:05', day: 2 },
            { name: 'Nagpur', arrival: '08:10', departure: '08:15', day: 2 },
            { name: 'Hyderabad Deccan', arrival: '17:10', departure: '17:10', day: 2 }
        ]
    },
    {
        trainNumber: '12840',
        trainName: 'Howrah Mail',
        totalSeats: 700,
        stations: [
            { name: 'Chennai Central', arrival: '23:45', departure: '23:45', day: 1 },
            { name: 'Vijayawada', arrival: '06:20', departure: '06:30', day: 2 },
            { name: 'Visakhapatnam', arrival: '13:00', departure: '13:20', day: 2 },
            { name: 'Bhubaneswar', arrival: '20:10', departure: '20:15', day: 2 },
            { name: 'Kharagpur', arrival: '01:30', departure: '01:35', day: 3 },
            { name: 'Howrah', arrival: '03:50', departure: '03:50', day: 3 }
        ]
    },
    {
        trainNumber: '12903',
        trainName: 'Golden Temple Mail',
        totalSeats: 650,
        stations: [
            { name: 'Mumbai Central', arrival: '18:45', departure: '18:45', day: 1 },
            { name: 'Surat', arrival: '21:50', departure: '21:55', day: 1 },
            { name: 'Vadodara', arrival: '23:35', departure: '23:45', day: 1 },
            { name: 'Kota', arrival: '07:10', departure: '07:20', day: 2 },
            { name: 'Hazrat Nizamuddin', arrival: '13:50', departure: '14:05', day: 2 },
            { name: 'Ambala Cantt', arrival: '17:20', departure: '17:25', day: 2 },
            { name: 'Amritsar', arrival: '21:30', departure: '21:30', day: 2 }
        ]
    },
    {
        trainNumber: '12617',
        trainName: 'Mangala Lakshadweep Express',
        totalSeats: 700,
        stations: [
            { name: 'Ernakulam', arrival: '13:25', departure: '13:25', day: 1 },
            { name: 'Mangalore', arrival: '21:25', departure: '21:40', day: 1 },
            { name: 'Madgaon', arrival: '02:00', departure: '02:10', day: 2 },
            { name: 'Panvel', arrival: '12:55', departure: '13:00', day: 2 },
            { name: 'Bhusaval', arrival: '21:00', departure: '21:05', day: 2 },
            { name: 'Bhopal', arrival: '04:00', departure: '04:05', day: 3 },
            { name: 'Hazrat Nizamuddin', arrival: '13:35', departure: '13:35', day: 3 }
        ]
    },
    {
        trainNumber: '12860',
        trainName: 'Gitanjali Express',
        totalSeats: 750,
        stations: [
            { name: 'Howrah', arrival: '13:50', departure: '13:50', day: 1 },
            { name: 'Kharagpur', arrival: '15:40', departure: '15:45', day: 1 },
            { name: 'Tatanagar', arrival: '17:45', departure: '17:50', day: 1 },
            { name: 'Nagpur', arrival: '07:40', departure: '07:45', day: 2 },
            { name: 'Bhusaval', arrival: '14:40', departure: '14:45', day: 2 },
            { name: 'Mumbai CSMT', arrival: '21:20', departure: '21:20', day: 2 }
        ]
    },
    {
        trainNumber: '15909',
        trainName: 'Avadh Assam Express',
        totalSeats: 600,
        stations: [
            { name: 'Dibrugarh', arrival: '10:20', departure: '10:20', day: 1 },
            { name: 'Guwahati', arrival: '21:50', departure: '22:05', day: 1 },
            { name: 'New Jalpaiguri', arrival: '05:35', departure: '05:45', day: 2 },
            { name: 'Gorakhpur', arrival: '23:30', departure: '23:45', day: 2 },
            { name: 'Lucknow', arrival: '05:10', departure: '05:20', day: 3 },
            { name: 'Moradabad', arrival: '10:45', departure: '10:53', day: 3 },
            { name: 'Delhi', arrival: '15:55', departure: '16:10', day: 3 },
            { name: 'Lalgarh', arrival: '04:10', departure: '04:10', day: 4 }
        ]
    },
    {
        trainNumber: '12055',
        trainName: 'Dehradun Jan Shatabdi',
        totalSeats: 450,
        stations: [
            { name: 'New Delhi', arrival: '15:20', departure: '15:20', day: 1 },
            { name: 'Meerut City', arrival: '16:40', departure: '16:42', day: 1 },
            { name: 'Dehradun', arrival: '21:10', departure: '21:10', day: 1 }
        ]
    },
    {
        trainNumber: '14012',
        trainName: 'Rohtak Express',
        totalSeats: 300,
        stations: [
            { name: 'New Delhi', arrival: '10:00', departure: '10:15', day: 1 },
            { name: 'Bahadurgarh', arrival: '11:00', departure: '11:05', day: 1 },
            { name: 'Rohtak', arrival: '12:00', departure: '12:00', day: 1 }
        ]
    }
];

module.exports = trains;
