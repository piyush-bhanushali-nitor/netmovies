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
      <h1>Search Movies</h1>
      <SearchBar onSearch={handleSearch} />
      {query && (
        <div>
          <h2>Results for "{query}"</h2>
          <MovieList movies={movies} loading={loading} error={error} />
        </div>
      )}
    </div>
  );
};

export default Search;