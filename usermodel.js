const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mongodblearning20_db_user:VuIlDHcuWTbwF14r@nakul.7aqwd0d.mongodb.net/mongodb_practice');

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String
});

module.exports = mongoose.model("user", userSchema);

