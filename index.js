const express = require('express');
const bodyParser = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = [];

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    //Obtener todos los comentarios de post id.
    const comments = commentsByPostId[req.params.id] || [];
    //Insert new post
    comments.push({id: commentId, content});
    //Update comments 
    commentsByPostId[req.params.id] = comments;
    //Send comments
    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log("App up 4001 port");
});