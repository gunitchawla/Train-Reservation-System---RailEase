import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle, X, Loader } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onConfirm, amount }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false); // Added success state
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            setSuccess(true); // Set success to true after loading
            setTimeout(() => {
                onConfirm(); // Call onConfirm after a short delay for success animation
            }, 1500);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="card w-full max-w-md p-6 relative bg-surface border border-white/10"
                >
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                                <CheckCircle size={64} className="text-success mb-4" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-success">Payment Successful!</h3>
                            <p className="text-muted">Redirecting to booking...</p>
                        </div>
                    ) : (
                        <>
                            <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-white">
                                <X size={20} />
                            </button>

                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <CreditCard className="text-primary" /> Payment Details
                            </h3>

                            <div className="mb-6 p-4 bg-primary-10 rounded border border-primary/20">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted">Total Amount</span>
                                    <span className="text-xl font-bold">₹{amount}</span>
                                </div>
                                <div className="text-xs text-muted">Includes taxes and fees</div>
                            </div>

                            <form onSubmit={handlePayment} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm text-muted mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="input"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        required
                                        maxLength={19}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-muted mb-1">Expiry</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="input"
                                            value={expiry}
                                            onChange={(e) => setExpiry(e.target.value)}
                                            required
                                            maxLength={5}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-muted mb-1">CVV</label>
                                        <input
                                            type="password"
                                            placeholder="123"
                                            className="input"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            required
                                            maxLength={3}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader size={20} className="animate-spin" /> Processing...
                                        </>
                                    ) : (
                                        <>
                                            Pay ₹{amount}
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PaymentModal;
