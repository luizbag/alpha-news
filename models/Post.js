var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    sent_by: {type: String, require: true},
    date_pub: {type: Date, default: Date.now},
    url: {type: String, required: true},
    points: {type: Number, default: 0},
    replies: [{}]
});

module.exports = mongoose.model('Post', PostSchema);