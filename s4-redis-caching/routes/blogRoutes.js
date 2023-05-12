const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const redis = require('redis');
    const redisURL = 'redis://127.0.0.1:6379'
    const client = redis.createClient(redisURL);

    //converting redis into a promise as bydefaut its not
    //and we dont want to use callback while 'get' data from cache
    const util = require('util');
    client.get = util.promisify(client.get);

    /*
    We want first check the query in redis before hitting db.
    If req present then return data right away otherwise get the data from db
    and store it in Redis and retun to user
    */

    //userid is our key
    //NO need to use callback as we are returning a promise due to promisify
    const cachedBlog = await client.get(req.user.id);


    const blogs = await Blog.find({ _user: req.user.id });

    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
