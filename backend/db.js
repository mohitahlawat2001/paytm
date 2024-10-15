const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mohitahlawat:mohit12345@cluster0.zmrkc.mongodb.net/paytm?retryWrites=true&w=majority&appName=Cluster0')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;