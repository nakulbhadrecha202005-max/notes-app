const express = require('express');
const app = express();
const userModels = require('./usermodel');

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hey");
});

app.post("/create", async (req, res) => {
    try {
        let createuser = await userModels.create(req.body);
        res.send(createuser);
    } catch (err) {
       console.log("Error ", err);
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
        res.send(readUser);
    } catch (err) {
        console.log("Error ", err);
    }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});