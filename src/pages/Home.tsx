import MovieList from '../components/MovieList';
import { useHomeMovies } from '../hooks/useHomeMovies';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { sections, loading, error } = useHomeMovies();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="error-page">
          <div className="error-icon">⚠️</div>
          <h1>Error Loading Movies</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {sections.map((section, index) => (
        section.movies.length > 0 && (
          <div key={index} className="movie-section">
            <h2 className="section-title">{section.title}</h2>
            <MovieList movies={section.movies} loading={section.loading} error={section.error} />
          </div>
        )
      ))}
    </div>
  );
};

export default Home;