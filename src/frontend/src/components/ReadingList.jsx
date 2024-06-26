import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

function ReadingList({ readingList, removeFromReadingList }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', padding:'20px' }}>
      {readingList.map(book => (
        <Card key={book.title} style={{ maxWidth: '200px', textAlign: 'center' }}>
          <CardMedia
            component="img"
            alt={book.title}
            image={`https://ello-frontend-challenge-d8h8.onrender.com/images${book.coverPhotoURL}`}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {book.author}
            </Typography>
            <Button 
              variant="contained" 
              style={{ backgroundColor: '#4AA088', color: '#fff' }} // Change background and text color
              onClick={() => removeFromReadingList(book.title)}
            >
              Remove
            </Button>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ReadingList;
