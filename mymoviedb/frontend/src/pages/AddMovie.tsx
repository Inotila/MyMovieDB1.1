import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { getApiKey, addMovie } from '../services/myMovieService';
import NavBar from '../components/Navbar';

const AddMovie: React.FC = () => {
  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [trailerLink, setTrailerLink] = useState('');
  const navigate = useNavigate();

  const handleAddMovie = async () => {
    try {
      const apiKey = await getApiKey();
      const newMovie = { title, poster, trailer_link: trailerLink, is_favorite: true, imdbid: "" };
      const response = await addMovie(newMovie, apiKey);
      if (response.success) {
        alert('Your movie was successfully added!');
        navigate('/');
      } else {
        alert('Failed to add movie');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie: An unexpected error occurred');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h1>Add New Movie</h1>
        <InputGroup className="mb-3">
          <InputGroup.Text id="Title">Title</InputGroup.Text>
          <Form.Control
            placeholder="Title"
            aria-label="Title"
            aria-describedby="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="poster-URL">Poster URL</InputGroup.Text>
          <Form.Control
            placeholder="Poster URL"
            aria-label="Poster"
            aria-describedby="poster-URL"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="trailer-link">Trailer Link</InputGroup.Text>
          <Form.Control
            placeholder="Trailer Link"
            aria-label="Trailer Link"
            aria-describedby="trailer-link"
            value={trailerLink}
            onChange={(e) => setTrailerLink(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" onClick={handleAddMovie}>Add Movie</Button>
      </div>
    </div>
  );
};

export default AddMovie;