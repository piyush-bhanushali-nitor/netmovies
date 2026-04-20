import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import TopRated from './pages/TopRated';
import MovieDetail from './pages/MovieDetail';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <Link to="/" className="nav-link">Trending</Link>
          <Link to="/top-rated" className="nav-link">Top Rated</Link>
          <Link to="/search" className="nav-link">Search</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;