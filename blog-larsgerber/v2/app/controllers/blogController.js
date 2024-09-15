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

const blog_details = (req, res, next) => {
  Blog.find({
    url: req.params.id
  })
    .then(result => {

      if (null === result[0]) throw err;
      result[0].body = (converter.makeHtml(result[0].body));

      if (res.locals.user === null && result[0].public === false) {
        throw { message: "NoPermission" }
      }

      res.render('details', { blog: result[0] });
    })
    .catch(err => {
      res.status(404).render('error', { errorcode: 404, url: "blog" })
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_update_get = (req, res, next) => {
  Blog.find({
    url: req.params.id
  })
    .then(result => {
      if (null === result[0]) throw err;
      res.render('update', { blog: result[0], title: 'Update a blog' });
    })
    .catch(err => {
      res.status(404).render('error', { errorcode: 404, url: "blog" })
    });
}

const blog_update_put = (req, res) => {
  req.body.url = (slugify(req.body.title));

  Blog.find({
    url: req.body.url
  })
    .then(result => {
      if (null == result[0] || req.params.id == result[0]._id) {
        Blog.findByIdAndUpdate(req.params.id, req.body)
          .then(result => {
            res.json({ status: 'success', redirect: `/blogs/${req.body.url}` });
          })
          .catch(err => {
            console.log(err);
          });
      }
      else {
        res.json({ status: 'dublicateError' });
      }
    })
}

const blog_create_post = (req, res) => {
  req.body.url = (slugify(req.body.title));

  Blog.find({
    url: req.body.url
  })
    .then(result => {
      if (null == result[0]) {
        const blog = new Blog(req.body);
        blog.save()
          .then(result => {
            res.json({ status: 'success', redirect: '/blogs' });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.json({ status: 'dublicateError' });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

function slugify(string) {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
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