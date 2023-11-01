/* eslint-disable no-console */
const mongoose = require('mongoose');

// Import Mongo connection string
require('dotenv').config();

const mongoString = process.env.MONGODB_CONNECTION_STRING;

const User = require('../models/user');
const Message = require('../models/message');

const user1 = new User({
  username: 'a@a',
  password: 'pass123',
  firstName: 'First',
  lastName: 'Last',
});

const message1 = new Message({
  title: 'The Title',
  content: 'Some content',
  author: user1._id,
});

async function main() {
  console.log('Connecting to MongoDB Atlas...');
  try {
    await mongoose.connect(mongoString);
  } catch (error) {
    console.log(error);
  }
  console.log('Connected. Populating database...');
  try {
    await Promise.all([user1.save(), message1.save()]);
    console.log(`Added user ${user1.fullName} (id ${user1._id})`);
    console.log(
      `Added message ${message1.title} by ${user1.fullName} (id ${message1.author})`,
    );
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.close();
  console.log('Connection closed.');
}

main();
