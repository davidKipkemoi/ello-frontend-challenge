import React, { useState, useEffect, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import { TextField, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

// GraphQL query to fetch books
const GET_BOOKS = gql`
  query GetBooks {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

// SearchBar component definition
function SearchBar({ addToReadingList }) {
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState('');
  // State to control visibility of the search results
  const [showResults, setShowResults] = useState(true);
  const resultsRef = useRef(null);

  // Fetching data using Apollo useQuery hook
  const { loading, error, data } = useQuery(GET_BOOKS);

  // Handle clicks outside the search results to hide them
  useEffect(() => {
    function handleClickOutside(event) {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [resultsRef]);

  // Ensure searchTerm update does not affect the hooks order
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  // If data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // If there's an error, display an error message
  if (error) return <p>Error :(</p>;

  // Filter books based on search term
  const filteredBooks = data.books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the SearchBar component
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color:'white' }}>
      <Paper elevation={10} style={{ padding: '10px', marginTop: '10px', fontFamily: 'Inter', flex: '0 1 50%', borderRadius: '30px', backgroundColor: 'transparent', text:'white' }}>
        <TextField
          label="Search for a book..."
          fullWidth
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: '#54CCCC' }} />
              </InputAdornment>
            ),
            style: { backgroundColor: 'transparent', borderRadius: '20px', paddingRight: '10px' }
          }}
          InputLabelProps={{
            shrink: true,
            style: { color: '#54CCCC' }
          }}
        />
        {/* If search term is entered and results should be shown, display the filtered book list */}
        {searchTerm && showResults && (
          <List ref={resultsRef} className="flex flex-col items-start">
            {filteredBooks.map(book => (
              <ListItem key={book.title} className="text-left">
                <ListItemAvatar>
                  <Avatar alt={book.title} src={`http://localhost:4000${book.coverPhotoURL}`} />
                </ListItemAvatar>
                <ListItemText primary={book.title} secondary={`Author: ${book.author}`} className="text-cyan-800" />
                {/* Add a button to add the book to the reading list */}
                <Button
                  variant="contained"
                  onClick={() => {
                    addToReadingList(book);
                    setShowResults(false);
                  }}
                  style={{ backgroundColor: '#5ACCCC', color: 'white' }}
                >
                  Add to Reading List
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </div>
  );
}

export default SearchBar;
