import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("watchlist");
        if (saved) {
            setWatchlist(JSON.parse(saved));
        }
        setLoaded(true);
    }, []);

    // Save to localStorage AFTER load
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
        }
    }, [watchlist, loaded]);

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