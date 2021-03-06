const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAdmin } = require("../middleware/index");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/assignments");
  },
  filename: (req, file, cb) => {
    const fileName1 = req.params.courseid + req.body.name + ".pdf";
    const fileName = fileName1.replace(/\s/g, "");
    cb(null, fileName);
  },
});
const assignmentController = require("../controllers/assignment.controller");
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, assignmentController.getAssignments);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  assignmentController.searchAssignment
);

router.get("/add", isLoggedIn, isAdmin, assignmentController.addAssignmentForm);

router.post(
  "/add",
  isLoggedIn,
  isAdmin,
  upload.single("assignment"),
  assignmentController.postAssignment
);

router.get(
  "/:assignmentid",
  isLoggedIn,
  isAdmin,
  assignmentController.getEditForm
);

router.put(
  "/:assignmentid",
  isLoggedIn,
  isAdmin,
  upload.single("assignment"),
  assignmentController.postEditForm
);

router.delete(
  "/:assignmentid",
  isLoggedIn,
  isAdmin,
  assignmentController.deleteAssignment
);

router.get(
  "/pdf/:assignmentid",
  isLoggedIn,
  isAdmin,
  assignmentController.getOneAssignment
);

module.exports = router;
