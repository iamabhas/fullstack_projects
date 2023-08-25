const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");

const bcrypt = require("bcrypt");
const salts = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessionE = require("express-session");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  sessionE({
    key: "userId",
    secret: "qwertyuiopasdfghjklzxcvbnm!@#$%^&*()",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
      sameSite: "Lax",
    },
  })
);

app.get("/", (req, res) => {
  res.json({ status: "Server Working !" });
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, salts, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Username already exists." });
          }
          console.log(err);
          return res.status(500).json({ error: "An error occurred." });
        }

        return res
          .status(200)
          .json({ message: "User registered successfully." });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query("SELECT * FROM users WHERE username=?", username, (err, result) => {
    if (err) {
      res.send({ status: "failed", error: err });
    } else {
      if (result.length > 0) {
        const hashedPasswordFromDB = result[0].password;
        bcrypt.compare(password, hashedPasswordFromDB, (err, passwordMatch) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "An error occurred." });
          }

          if (passwordMatch) {
            req.session.user = result;
            console.log(req.session.user);
            return res.send(result);
          } else {
            return res.send({
              status: "failed",
              message: "Wrong Password and Username combination!",
            });
          }
        });
      } else {
        res.send({
          status: "failed",
          message: "Wrong Password and Username combination!",
        });
      }
    }
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.listen(3001, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server running on port 3001...!");
});
