const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/api/submit", (req, res) => {
  const { name, phone, email } = req.body;

  const sql = "INSERT INTO users (name, phone, email) VALUES (?, ?, ?)";

  db.query(sql, [name, phone, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Database error ❌" });
    } else {
      res.json({ message: "Data stored successfully ✅" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
