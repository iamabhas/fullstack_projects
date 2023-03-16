const express = require("express");
const mysql = require("mysql");
var cors = require('cors');

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abhas123@",
  database: "moviedb",
});


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Working !");
});

app.get("/movies", (req, res) => {
  const q = "SELECT * FROM movies";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/movies/:id",(req,res)=>{
  const movieID = req.params.id
  const q = "SELECT * FROM movies WHERE id=?"
  db.query(q,[movieID],(err,data)=>{
    if(err){
      return res.json(err)
    }
    return res.json(data)
  })
})

app.post("/movies", (req, res) => {
  const q = "INSERT INTO movies(`title`,`desc`,`poster`,`state`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.poster,
    req.body.state
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Movie Created !");
  });
});

app.delete("/movies/:id",(req,res)=>{
  movieId = req.params.id;
  const q = "DELETE FROM movies WHERE id = ?"
  db.query(q,[movieId],(err,data)=>{
    if(err){
      return res.json(err)
    }
    return res.json("Entry Deleted !")
  })

})

app.put("/movies/:id",(req,res)=>{
  movieId = req.params.id;
  const q = "UPDATE movies SET `title`=?,`desc`=?,`poster`=?,`state`=? WHERE id=?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.poster,
    req.body.state
  ];
  db.query(q,[...values,movieId],(err,data)=>{
    if(err){
      return res.json(err)
    }
    return res.json("Entry Updated !")
  })

})

app.listen(5000, () => {
  console.log("SERVER LISTENING ON PORT 5000...");
});
