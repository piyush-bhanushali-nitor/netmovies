import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { useMovies } from '../hooks/useMovies';

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const { movies, loading, error } = useMovies('search', query);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <h1 className="page-title">Search Movies</h1>
      <SearchBar onSearch={handleSearch} />
      {query && (
        <div>
          <h2 className="page-title" style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
            Results for "{query}"
          </h2>
          <MovieList movies={movies} loading={loading} error={error} />
        </div>
      )}
    </div>
  );
};

export default Search;