const mongoose = require('mongoose');

const { Schema } = mongoose;

// TODO: More Schema validation

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxLength: [100, 'Email must not exceed 100 characters'],
  },
  password: {
    type: String,
    required: true,
    minLength: [3, 'Password must be at least 3 characters long'],
    maxLength: [100, 'Password must not exceed 100 characters'],
  },
  firstName: {
    type: String,
    required: true,
    minLength: [1, 'First name must be at least 1 character long'],
    maxLength: [100, 'First name must not exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [1, 'Last name must be at least 1 character long'],
    maxLength: [100, 'First name must not exceed 50 characters'],
  },
  isMember: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false },
});

UserSchema.virtual('fullName').get(function fullName() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);
