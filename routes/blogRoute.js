const { renderCreateBlog,renderMyBlogs, createBlog, allBlog, singleBlog, deleteBlog, editBlog, renderEditBlog } = require("../controller/blog/blogController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = require("express").Router()
const { multer, storage } = require("../middleware/multerConfig");
const { isValidUser } = require("../middleware/validUser");
const upload = multer({ storage: storage });
router.route("/").get(allBlog)
router.route("/createBlog").get( isAuthenticated, renderCreateBlog).post(isAuthenticated,upload.single('image'),createBlog)
router.route("/single/:id").get(singleBlog)
router.route("/delete/:id").get(isAuthenticated,deleteBlog)
router.route("/editBlog/:id").post(isAuthenticated,isValidUser, upload.single('image'), editBlog)
router.route("/edit/:id").get(isAuthenticated,renderEditBlog)
router.route("/myblogs").get(isAuthenticated,renderMyBlogs)
module.exports = router;