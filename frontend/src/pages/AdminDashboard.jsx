import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Plus, List } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('addTrain');
    const [trainNumber, setTrainNumber] = useState('');
    const [trainName, setTrainName] = useState('');
    const [stations, setStations] = useState('');
    const [totalSeats, setTotalSeats] = useState('');
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(AuthContext);

    const handleAddTrain = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/api/trains`, {
                trainNumber,
                trainName,
                stations: stations.split(',').map(s => s.trim()),
                totalSeats: Number(totalSeats),
            }, config);

            alert('Train Added Successfully');
            setTrainNumber('');
            setTrainName('');
            setStations('');
            setTotalSeats('');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to add train');
        }
    };

    useEffect(() => {
        if (activeTab === 'bookings') {
            const fetchBookings = async () => {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings`, config);
                    setBookings(data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchBookings();
        }
    }, [activeTab, user]);

    return (
        <div className="container mt-8">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('addTrain')}
                    className={`btn ${activeTab === 'addTrain' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    <Plus size={16} className="mr-2" /> Add Train
                </button>
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    <List size={16} className="mr-2" /> All Bookings
                </button>
            </div>

            {activeTab === 'addTrain' ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card max-w-2xl"
                >
                    <h3 className="text-xl font-bold mb-4">Add New Train</h3>
                    <form onSubmit={handleAddTrain} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm text-muted mb-1">Train Number</label>
                            <input
                                type="text"
                                className="input"
                                value={trainNumber}
                                onChange={(e) => setTrainNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-muted mb-1">Train Name</label>
                            <input
                                type="text"
                                className="input"
                                value={trainName}
                                onChange={(e) => setTrainName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-muted mb-1">Stations (comma separated)</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Delhi, Agra, Kanpur, Prayagraj"
                                value={stations}
                                onChange={(e) => setStations(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-muted mb-1">Total Seats</label>
                            <input
                                type="number"
                                className="input"
                                value={totalSeats}
                                onChange={(e) => setTotalSeats(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Add Train</button>
                    </form>
                </motion.div>
            ) : (
                <div className="grid gap-4">
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={booking._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card flex items-center justify-between"
                        >
                            <div>
                                <h3 className="font-bold">#{booking.bookingId}</h3>
                                <p className="text-sm text-muted">{booking.user?.name} ({booking.user?.email})</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">{booking.trainNumber}</p>
                                <p className="text-sm text-muted">{booking.from} → {booking.to}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
