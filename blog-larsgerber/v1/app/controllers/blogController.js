const Blog = require('../models/blog');
var showdown = require('showdown');
var converter = new showdown.Converter();
converter.setOption('tables', 'true');
converter.setOption('tablesHeaderId', 'true');
converter.setOption('emoji', 'true');
converter.setOption('noHeaderId', 'true');
converter.setOption('strikethrough', 'true');
converter.setOption('tasklists', 'true');
converter.setOption('ghMentions', 'true');
converter.setOption('openLinksInNewWindow', 'true');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {

      if (res.locals.user === null) {
        result = result.filter(x => x.public === true);
      }

      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      if (null === result) throw err;
      result.body = (converter.makeHtml(result.body));

      if (res.locals.user === null && result.public === false) {
        throw { message: "NoPermission" }
      }

      res.render('details', { blog: result });
    })
    .catch(err => {
      res.status(404).redirect('/page-not-found');
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_update_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      if (null === result) throw err;
      res.render('update', { blog: result, title: 'Update a blog' });
    })
    .catch(err => {
      res.status(404).redirect('/page-not-found');
    });
}

const blog_update_put = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body)
    .then(result => {
      res.json({ redirect: `/blogs/${id}` });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      // res.json({ redirect: `/blogs/${result.id}` });
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_update_get,
  blog_update_put,
  blog_delete
}