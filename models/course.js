const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course_id: String,
  name: String,
  credits: String,
  description: String,
  instructur: String,
  level: String,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
