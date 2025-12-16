import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (from && to && date) {
            navigate(`/search?from=${from}&to=${to}&date=${date}`);
        }
    };

    return (
        <div className="min-h-screen-minus-header flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute bg-primary-20 rounded-full blur-100" style={{ top: '-10%', left: '-10%', width: '40%', height: '40%' }}></div>
                <div className="absolute bg-secondary-20 rounded-full blur-100" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%' }}></div>
            </div>

            <div className="container flex flex-col items-center gap-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">
                        Travel with <span className="text-gradient">RailEase</span>
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        Experience the future of train travel. Smart booking, segment-based availability, and seamless journeys.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onSubmit={handleSearch}
                    className="card p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted">From</label>
                        <div className="relative">
                            <MapPin className="absolute text-muted" size={20} style={{ left: '0.75rem', top: '0.75rem' }} />
                            <input
                                type="text"
                                placeholder="Source Station"
                                className="input pl-10"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted">To</label>
                        <div className="relative">
                            <MapPin className="absolute text-muted" size={20} style={{ left: '0.75rem', top: '0.75rem' }} />
                            <input
                                type="text"
                                placeholder="Destination Station"
                                className="input pl-10"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-muted">Date</label>
                        <div className="relative">
                            <Calendar className="absolute text-muted" size={20} style={{ left: '0.75rem', top: '0.75rem' }} />
                            <input
                                type="date"
                                className="input pl-10"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" style={{ height: '46px' }}>
                        <Search size={20} className="mr-2" /> Search
                    </button>
                </motion.form>
            </div>
        </div>
    );
};

export default Home;
