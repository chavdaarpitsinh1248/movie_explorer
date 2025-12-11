import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
//import Watchlist from "./pages/Watchlist";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="min-h-screen px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          {/*<Route path="/watchlist" element={<Watchlist />} />*/}
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;