import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);

    // load from localStorage when app starts
    useEffect(() => {
        const saved = localStorage.getItem("watchlist");
        if(saved) {
            setWatchlist(JSON.parse(saved));
        }
    }, []);

    // save to localStorage whenever watchlist changes
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    function addToWatchlist(movie) {
        if (!watchlist.find((m) => m.imdbID === movie.imdbID)) {
            setWatchlist([...watchlist, movie]);
        }
    }

    function removeFromWatchlist(id) {
        setWatchlist(watchlist.filter((m) => m.imdbID !== id));
    }

    function isInWatchlist(id) {
        return watchlist.some((m) => m.imdbID === id);
    }

    return (
        <WatchlistContext.Provider
            value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
        >
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist() {
    return useContext(WatchlistContext);
}