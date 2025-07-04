const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vivekgamer8722:8722@cluster0.uickk0s.mongodb.net/Rooms');

const Room = mongoose.model('Room', new mongoose.Schema({
    room_name: { type: String, required: true },
    messages: { type: Array, default: [] }
}));

module.exports = {
    Room,
}