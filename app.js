const express = require('express');

const userModels = require('./usermodel');

const cors = require("cors");
const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://notesbynakul.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.options('*', cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hey");
});

app.post("/create", async (req, res) => {
    try {
        let createuser = await userModels.create(req.body);
        res.json(createuser);
    } catch (err) {
       console.log("Error ", err);
        res.status(500).json({ error: err.message });
    }
});


app.put("/update/:id", async (req, res) => {
    try {
        let UpdatedUser = await userModels.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(UpdatedUser);
    } catch (err) {
       res.status(500).json({ error: err.message });
    }
});

app.delete("/delete/:id", async (req, res) => {
    let deletedUser = await userModels.findOneAndDelete({ _id: req.params.id });
    res.send(deletedUser);
});

app.get("/read", async (req, res) => {
    try {
        let readUser = await userModels.find();
        res.json(readUser);
    } catch (err) {
        console.log("Error ", err);
        res.status(500).json({ error: err.message });
    }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});