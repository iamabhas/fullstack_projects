import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MovieIcon from "@mui/icons-material/Movie";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CachedIcon from "@mui/icons-material/Cached";
const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/movies");
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <main className="main-container">
      <h1 className="main-heading">My Movies</h1>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        endIcon={<MovieIcon />}
        className="add-btn"
      >
        <Link style={{ textDecoration: "none", color: "white" }} to="/add">
          Add Movie
        </Link>
      </Button>
      <div className="movies-container">
        {movies.map((movie) => {
          return (
            <div className="single-movie" key={movie.id}>
              {movie.poster && <img src={movie.poster} alt={movie.title} />}
              <h2>{movie.title}</h2>
              <p>{movie.desc}</p>
              <span style={{ color: "#2596be", fontSize: "12px" }}>
                {" "}
                Status :
              </span>
              <span>{movie.state}</span>
              <br></br>
              <Button
                variant="contained"
                startIcon={<DeleteForeverIcon />}
                className="delete-btn"
                onClick={() => {
                  handleDelete(movie.id);
                }}
              >
                Delete Entry
              </Button>
              <br></br>
              <Button
                variant="contained"
                startIcon={<CachedIcon />}
                className="update-btn"
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/update/${movie.id}`}
                >
                  Update Entry
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Movies;
