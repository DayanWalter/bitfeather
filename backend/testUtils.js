// Setup file for tests. Just import to every test
// Import the 'express' framework.
const express = require('express');
// Create an instance of the express application.
const app = express();
// Import request from "supertest"
const request = require('supertest');
// Import the 'user' route.
const user = require('./routes/user');
// Import the 'post' route.
const post = require('./routes/post');
// Import the 'comment' route.
const comment = require('./routes/comment');

// Parse URL-encoded requests.
app.use(express.urlencoded({ extended: false }));
// Use the 'user' route for '/user' path.
app.use('/user', user);
// Use the 'post' route for '/post' path.
app.use('/post', post);
// Use the 'comment' route for '/comment' path.
app.use('/comment', comment);

// Add more routes after importing...

module.exports = { app, request };
