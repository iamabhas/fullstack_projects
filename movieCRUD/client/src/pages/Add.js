import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const [movie, setMovie] = useState({
    title: "",
    desc: "",
    state: "",
    poster: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setMovie((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    console.log(1);
    if (
      movie.title === "" ||
      movie.desc === "" ||
      movie.state === "" ||
      movie.poster === ""
    ) {
      alert("Value Missing !");
    } else {
      try {
        await axios.post("http://localhost:5000/movies", movie);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="form">
      <h1 style={{ margin: "1rem" }}>Add a Movie</h1>

      <input
        type="text"
        placeholder="Movie Name"
        name="title"
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Movie Description"
        name="desc"
        onChange={handleChange}
      />

      <br />
      <br />

      <Box sx={{ minWidth: 140 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={movie.state}
            name="state"
            label="state"
            onChange={handleChange}
          >
            <MenuItem value={"Watching"}>Watching</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
            <MenuItem value={"Plan to Watch"}>Plan to Watch</MenuItem>
            <MenuItem value={"Dropped"}>Dropped</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <br />

      <input
        type="text"
        placeholder="Movie Cover"
        name="poster"
        onChange={handleChange}
      />

      <br />
      <br />
      <div className="btn-container">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClick}
          className="btn"
        >
          Add
        </Button>

        <Button
          variant="contained"
          startIcon={<CancelIcon />}
          onClick={() => {
            navigate("/");
          }}
          className="btn"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Add;
