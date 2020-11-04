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

app.post('/api/posts', (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    })
  });
});

app.get('/api/posts', (req, res) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });

});

app.delete('/api/posts/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id}).then(() => {
    res.status(200).json({
      message: 'Post deleted!'
    })
  })
});

module.exports = app;
