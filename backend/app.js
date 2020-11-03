const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connection = require('./connection');

const Post = require('./models/post')

const app = express();

mongoose.connect(connection)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req, res, next)=> {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post.save();

  res.status(201).json({
    message: 'Post added successfully'
  })
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asdsadw3e2',
      title: 'First post',
      content: 'First post from server'
    },
    {
      id: 'huysad6763',
      title: 'Second post',
      content: 'Second post from server'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
