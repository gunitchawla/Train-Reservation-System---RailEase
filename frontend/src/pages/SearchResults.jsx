import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Train, ArrowRight, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');

    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState({}); // { trainId: 'SL' }

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/trains/search?from=${from}&to=${to}&date=${date}`);
                if (Array.isArray(data)) {
                    setTrains(data);
                } else {
                    console.error('API returned non-array data:', data);
                    setTrains([]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (from && to && date) {
            fetchTrains();
        }
    }, [from, to, date]);

    const handleClassSelect = (trainId, cls) => {
        setSelectedClass(prev => ({ ...prev, [trainId]: cls }));
    };

    const initiateBooking = (trainNumber, trainId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedTrain({ number: trainNumber, id: trainId });
        setIsPaymentOpen(true);
    };

    const handlePaymentSuccess = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const trainId = selectedTrain.id;
            const cls = selectedClass[trainId] || 'SL';

            await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
                trainNumber: selectedTrain.number,
                from: from, // These are from the URL/State, which are what the user typed
                to: to,
                date,
                transactionId: 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase(),
                classType: cls
            }, config);

            setIsPaymentOpen(false);
            alert('Payment Successful! Booking Confirmed.');
            navigate('/my-bookings');
        } catch (error) {
            setIsPaymentOpen(false);
            alert(error.response?.data?.message || 'Booking Failed');
        }
    };

    return (
        <div className="container mt-8">
            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                onConfirm={handlePaymentSuccess}
                amount={selectedTrain ? trains.find(t => t.trainNumber === selectedTrain.number)?.prices[selectedClass[selectedTrain.id] || 'SL'] : 0}
            />

            <h2 className="text-3xl font-bold mb-6">Search Results</h2>
            <div className="flex items-center gap-4 text-muted mb-8">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> {from}</span>
                <ArrowRight size={16} />
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary"></div> {to}</span>
                <span className="ml-4 flex items-center gap-2 border-l border-black/5 pl-4">
                    <Calendar size={16} /> {date}
                </span>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading trains...</div>
            ) : trains.length === 0 ? (
                <div className="text-center py-12 text-muted">No trains found for this route.</div>
            ) : (
                <div className="grid gap-4">
                    {trains.map((train, index) => {
                        const currentClass = selectedClass[train._id] || 'SL';
                        const seats = train.availability ? train.availability[currentClass] : 0;
                        const price = train.prices ? train.prices[currentClass] : 0;

                        return (
                            <motion.div
                                key={train._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card flex flex-col md:flex-row items-center justify-between gap-6"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full bg-primary-10 flex items-center justify-center text-primary">
                                        <Train size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{train.trainName}</h3>
                                        <p className="text-sm text-muted">#{train.trainNumber}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-4 flex-1">
                                    <div className="flex items-center gap-4 text-lg font-bold">
                                        <span>{train.departureTime}</span>
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-muted">{train.duration}</span>
                                            <div className="w-24 h-[1px] bg-primary/30 relative">
                                                <div className="absolute -top-1 right-0 w-2 h-2 bg-primary rounded-full"></div>
                                            </div>
                                        </div>
                                        <span>{train.arrivalTime}</span>
                                    </div>

                                    {/* Class Selection Tabs */}
                                    <div className="flex gap-2 p-1 bg-black/5 rounded-lg">
                                        {['SL', '3A', '2A', '1A'].map(cls => (
                                            <button
                                                key={cls}
                                                onClick={() => handleClassSelect(train._id, cls)}
                                                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${currentClass === cls
                                                    ? 'bg-white shadow-sm text-primary'
                                                    : 'text-muted hover:text-text'
                                                    }`}
                                            >
                                                {cls}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Price and Seats Info (Next Line) */}
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold">₹{price}</span>
                                        </div>
                                        <div className="w-[1px] h-4 bg-black/10"></div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted">Available:</span>
                                            <div className={`flex items-center gap-1.5 ${seats > 0 ? 'text-success' : 'text-orange-500'}`}>
                                                {seats > 0 ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                                <span className="font-medium">
                                                    {seats > 0 ? `${seats} Seats Available` : 'Waitlist Available'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => initiateBooking(train.trainNumber, train._id)}
                                        className={`btn px-6 py-2 rounded-lg font-medium transition-all ${seats > 0
                                            ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-primary/25'
                                            : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg'
                                            }`}
                                    >
                                        {seats > 0 ? 'Book Now' : 'Book Waitlist'}
                                    </button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
