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
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', color: 'white' }}>
      <Paper elevation={10} style={{ padding: '10px', marginTop: '10px', fontFamily: 'Inter', flex: '0 1 50%', borderRadius: '30px', backgroundColor: 'transparent' }}>
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
            style: { 
              backgroundColor: 'transparent', 
              borderRadius: '20px', 
              paddingRight: '10px', 
              color: 'white' // Change text color to white
            },
            inputProps: {
              style: { color: 'white' } // Ensure input text color is white
            }
          }}
          InputLabelProps={{
            shrink: true,
            style: { color: '#54CCCC' }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#54CCCC' // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'white' // Hover border color
              },
              '&.Mui-focused fieldset': {
                borderColor: '#54CCCC' // Focused border color
              }
            },
            '& .MuiInputBase-input': {
              color: 'white' // Ensure input text color is white
            }
          }}
        />
        {/* If search term is entered and results should be shown, display the filtered book list */}
        {searchTerm && showResults && (
          <List ref={resultsRef} className="flex flex-col items-start">
            {filteredBooks.map(book => (
              <ListItem key={`${book.title}-${book.author}`} className="text-left">
                <ListItemAvatar>
                <Avatar alt={book.title} src={`http://localhost:4000/images${book.coverPhotoURL}`} />


                </ListItemAvatar>
                <ListItemText 
                    primary={book.title} 
                    secondary={`Author: ${book.author}`} 
                    primaryTypographyProps={{ style: { color: '#54CCCC' } }} // Set title text color to white
                    secondaryTypographyProps={{ style: { color: 'white' } }} // Set author text color to white
                />

                {/* Add a button to add the book to the reading list */}
                <Button
                  variant="contained"
                  onClick={() => {
                    addToReadingList(book);
                    setShowResults(false);
                  }}
                  style={{ backgroundColor: '#54CCCC', color: 'white' }}
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
