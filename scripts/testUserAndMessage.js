/* eslint-disable no-console */
const mongoose = require('mongoose');

// Import Mongo connection string
require('dotenv').config();

const mongoString = process.env.MONGODB_CONNECTION_STRING;

const Message = require('../models/message');

const message1 = new Message({
  title: 'A title',
  content: 'Some content',
  author: 'Some guy',
});

const message2 = new Message({
  title: 'Another Title',
  content: 'More content for message 2',
  author: 'Somebody',
});

const message3 = new Message({
  title: 'Message Title 3',
  content: 'Content for the third message',
  author: 'Some gal',
});

const message4 = new Message({
  title: 'Important Announcement',
  content: 'This is an important message with important content.',
  author: 'Mr. President',
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
    await Promise.all([
      message1.save(),
      message2.save(),
      message3.save(),
      message4.save(),
    ]);
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.close();
  console.log('Connection closed.');
}

main();
