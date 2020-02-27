const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const asynHandler = require("../middleware/async");

exports.getAllCourses = asynHandler(async (req, res, next) => {
  const courses = await Course.findAll();
  if (!courses) {
    return next(new ErrorResponse(`No Course exists`, 400));
  }
  res.status(200).json({ success: true, data: courses });
});

exports.getCourse = asynHandler(async (req, res, next) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) {
    return next(
      next(new ErrorResponse(`Course id ${req.params.id} not found`, 400))
    );
  }
  res.status(200).json({ success: true, data: course });
});

exports.createCourse = asynHandler(async (req, res, next) => {
  const course = await Course.create(req.body);
  res.status(201).json({ success: true, data: course });
});

exports.updateCourse = asynHandler(async (req, res, next) => {
  //Course.find;
  const course = await Course.update(req.body, {
    where: { id: req.params.id }
  });
  if (!course) {
    return next(new ErrorResponse(`Course id ${req.params.id} not found`, 400));
  }
  res.status(200).json({ status: true, data: req.body });
});

exports.deleteCourse = asynHandler(async (req, res, next) => {
  try {
    const course = await Course.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!course) {
      return next(
        new ErrorResponse(`Course id ${req.params.id} not found`, 400)
      );
    }

    res.status(200).json({ status: true });
  } catch (err) {
    es.status(200).json({ status: false });
  }
});
