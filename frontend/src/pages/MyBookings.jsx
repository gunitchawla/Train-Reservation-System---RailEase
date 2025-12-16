import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Calendar, MapPin, Trash2, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/mybookings`, config);
                // Sort by created date (newest first)
                setBookings(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    const [cancellingId, setCancellingId] = useState(null);

    const confirmCancel = async (id) => {
        console.log('Attempting to cancel booking:', id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`, config);
            console.log('Cancel response:', response.data);

            // Update local state to reflect cancellation
            setBookings(bookings.map(booking =>
                booking._id === id ? { ...booking, status: 'CANCELLED' } : booking
            ));

            setCancellingId(null);
        } catch (error) {
            console.error('Cancel failed:', error);
            // alert('Failed to cancel ticket'); // Removed alert
        }
    };

    if (!user) {
        return <div className="container mt-8 text-center">Please login to view bookings.</div>;
    }

    return (
        <div className="container mt-8 pb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Train size={32} />
                </span>
                My Bookings
            </h2>

            {loading ? (
                <div className="text-center py-12">Loading bookings...</div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-12 text-muted bg-surface rounded-2xl border border-black/5">
                    <p className="text-xl mb-2">No bookings found</p>
                    <p className="text-sm">Your booked tickets will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    <AnimatePresence>
                        {bookings.map((booking, index) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`card relative overflow-hidden group ${booking.status === 'CANCELLED' ? 'opacity-75 grayscale-[0.5]' : ''
                                    }`}
                            >
                                {/* Status Badge */}
                                <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider ${booking.status === 'CONFIRMED'
                                    ? 'bg-success/10 text-success'
                                    : booking.status === 'WAITLISTED'
                                        ? 'bg-orange-500/10 text-orange-500'
                                        : 'bg-error/10 text-error'
                                    }`}>
                                    {booking.status}
                                </div>

                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    {/* Left Section: Train Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${booking.status === 'CONFIRMED' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                <Train size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {booking.trainNumber}
                                                </h3>
                                                <p className="text-sm text-muted">PNR: {booking.bookingId}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 text-sm">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-muted flex items-center gap-1"><MapPin size={14} /> From</span>
                                                <span className="font-semibold text-lg">{booking.from}</span>
                                            </div>
                                            <div className="flex flex-col items-center pt-4">
                                                <div className="w-16 h-[1px] bg-gray-300 relative">
                                                    <div className="absolute -top-1 right-0 w-2 h-2 bg-gray-300 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-muted flex items-center gap-1"><MapPin size={14} /> To</span>
                                                <span className="font-semibold text-lg">{booking.to}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Section: Details & Actions */}
                                    <div className="flex flex-col items-end justify-between gap-4 border-l border-black/5 pl-6 min-w-[200px]">
                                        <div className="text-right">
                                            <div className="flex items-center justify-end gap-2 text-muted mb-1">
                                                <Calendar size={14} />
                                                <span className="text-sm">Travel Date</span>
                                            </div>
                                            <p className="font-bold text-lg">{booking.date}</p>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-center justify-end gap-2 text-muted mb-1">
                                                <Clock size={14} />
                                                <span className="text-sm">Booked On</span>
                                            </div>
                                            <p className="text-sm font-medium">
                                                {new Date(booking.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {(booking.status === 'CONFIRMED' || booking.status === 'WAITLISTED') && (
                                            cancellingId === booking._id ? (
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={() => confirmCancel(booking._id)}
                                                        className="btn bg-error text-white hover:bg-red-600 px-3 py-1 rounded-lg text-xs transition-colors"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button
                                                        onClick={() => setCancellingId(null)}
                                                        className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1 rounded-lg text-xs transition-colors"
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setCancellingId(booking._id)}
                                                    className="btn bg-error/10 text-error hover:bg-error hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors mt-2"
                                                >
                                                    <Trash2 size={16} />
                                                    Cancel Ticket
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Transaction ID Footer */}
                                {booking.transactionId && (
                                    <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center text-xs text-muted">
                                        <span>Transaction ID: <span className="font-mono">{booking.transactionId}</span></span>
                                        {booking.paymentStatus === 'PAID' && (
                                            <span className="flex items-center gap-1 text-success">
                                                <CheckCircle size={12} /> Payment Verified
                                            </span>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
