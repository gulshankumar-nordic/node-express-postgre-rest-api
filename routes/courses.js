const express = require("express");

const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");

const router = express.Router();
const { protect, authorize } = require("../middleware/authorization");
router
  .route("/")
  .get(protect, getAllCourses)
  .post(protect, authorize("Publisher", "admin"), createCourse);

router
  .route("/:id")
  .get(protect, getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
