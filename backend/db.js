const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mohitahlawat:mohit12345@cluster0.zmrkc.mongodb.net/paytm?retryWrites=true&w=majority&appName=Cluster0')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

const accountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}