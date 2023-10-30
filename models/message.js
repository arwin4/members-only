const mongoose = require('mongoose');

const { Schema } = mongoose;

// TODO: More Schema validation?

const MessageSchema = Schema({
  title: {
    type: String,
    minLength: [1, 'Title must have at least 1 character'],
    maxLength: [50, 'Title must not exceed 50 characters'],
    required: true,
  },
  content: {
    type: String,
    minLength: [1, 'Message must have at least 1 character'],
    maxLength: [500, 'Message must not exceed 500 characters'],
    required: true,
  },
  date: { type: Date, default: Date.now },
  // TODO: Find out if following validation is correct, and necessary
  author: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model('Message', MessageSchema);
