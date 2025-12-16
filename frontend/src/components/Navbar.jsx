import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Train, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50 border-b border-black/5">
            <div className="container flex items-center justify-between h-16">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                    <Train className="text-primary" />
                    <span className="text-gradient">RailEase</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    {user ? (
                        <>
                            <Link to="/my-bookings" className="hover:text-primary transition-colors">My Bookings</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
                            )}
                            <div className="flex items-center gap-4 ml-4">
                                <span className="text-sm text-muted">Hi, {user.name}</span>
                                <button onClick={handleLogout} className="btn btn-secondary py-2 px-4 text-sm flex items-center gap-2">
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary py-2 px-6">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
