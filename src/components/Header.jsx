import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
            <Link to="/">
                <h1 className="text-2xl font-bold">Movie Explorer</h1>
            </Link>

            <nav className="flex gap-6 text-lg">
                <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
                <Link to="/watchlist" className="hover:text-yellow-300 transition">Watchlist</Link>"
            </nav>
        </header>
    );
}