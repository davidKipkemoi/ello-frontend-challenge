import  { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BookSearch from './components/BookSearch';
import ReadingList from './components/ReadingList';
import Header from './components/Header';
import Homepage from './components/Homepage';
import './index.css';

// Create an instance of ApolloClient
const client = new ApolloClient({
  uri: 'https://ello-frontend-challenge-d8h8.onrender.com/graphql', // GraphQL server URI
  cache: new InMemoryCache() // In-memory cache for Apollo Client
});

function App() {
  // Define state to hold the reading list
  const [readingList, setReadingList] = useState([]);

  // Function to add a book to the reading list
  const addToReadingList = (book) => {
    // Check if the book is not already in the reading list
    if (!readingList.find(item => item.title === book.title)) {
      // Add the book to the reading list
      setReadingList([...readingList, book]);
    }
  };

  // Function to remove a book from the reading list
  const removeFromReadingList = (title) => {
    // Filter out the book with the given title
    setReadingList(readingList.filter(book => book.title !== title));
  };

  return (
    <ApolloProvider client={client}>
      <div className="">
        <div
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1551449896-66e638cbda3d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Header />
          <Homepage />
        </div>

        <div className="relative rounded-3xl min-h-screen justify-center mt-5">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1605627079912-97c3810a11a4?q=80&w=2007&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1, // Ensure the background is behind other content
              minHeight: '100vh',
              backgroundAttachment: 'fixed',
            }}
          />
          <h1 className="text-white text-3xl font-bold text-center pt-10">
            <div className="inline-block">
              Book Search
              <span className="border-b-4 border-white dark:border-white mt-1 block w-12"></span>
            </div>
          </h1>

          {/* Render BookSearch component and pass addToReadingList function */}
          <BookSearch addToReadingList={addToReadingList} />

          <h1 className="text-white text-3xl font-bold text-center pt-10">
            <div className="inline-block">
              Reading List
              <span className="border-b-4 border-white dark:border-white mt-1 block w-12"></span>
            </div>
          </h1>

          {/* Render ReadingList component and pass readingList and removeFromReadingList function */}
          <ReadingList readingList={readingList} removeFromReadingList={removeFromReadingList} />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
