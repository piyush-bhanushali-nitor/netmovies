import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Search from './pages/Search';
import TopRated from './pages/TopRated';
import MovieDetail from './pages/MovieDetail';
import './styles/main.css';

function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">NETMOVIES</Link>
      <nav className="nav">
        <Link
          to="/"
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/top-rated"
          className={`nav-link ${location.pathname === '/top-rated' ? 'active' : ''}`}
        >
          Top Rated
        </Link>
        <Link
          to="/search"
          className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
        >
          Search
        </Link>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;