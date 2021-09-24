import express from "express"
import Blog from "../models/blog.js"
const router = express.Router()

router.get("/", (req, res) => {

  res.locals.title = null;
  res.locals.content = null;

  res.render("index");
})

router.post("/", async (req, res) => {

  const {title, content} = req.body;

  var errors = {title: "", content: ""};

  if(title == "") errors.title = "This field is required";
  if(content == "") errors.content = "This field is required";


  if(!errors.title == "" || !errors.content == ""){

    res.render("index", {title: errors.title, content: errors.content})
    return

  }

  try {

    let newBlog = new Blog({title, content})
    await newBlog.save()
    res.redirect("/blogs");

  } catch (err) {
    res.status(500).send("something went wrong, please try again later....")
  }

})

router.get("/blogs", async (req, res) => {

  res.locals.blogs = null
  res.locals.pages = null
  res.locals.pageNumber = null

  let pageNumber = req.query.page ?? 1
  let totalBlogs = await Blog.countDocuments()
  let blogPerPage = 1;
  let pages = Math.floor((totalBlogs / blogPerPage));

  if(pageNumber < 0) pageNumber = 1
  if(pageNumber > pages) pageNumber = pages

  let pageOffset = (pageNumber * blogPerPage) - blogPerPage;

  let blogs = await Blog.find().skip(pageOffset).sort('-createdAt').limit(blogPerPage);


  res.render("blogs", {blogs, pages, pageNumber})
})

export default router