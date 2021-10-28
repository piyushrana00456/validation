const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

router.post(
  "/",
  body("id").isLength({ min: 1 }).withMessage("id is required"),
  body("first_name").isLength({ min: 1 }).withMessage("first name is required"),
  body("last_name").isLength({ min: 1 }).withMessage("last name is required"),
  body("email")
    .isEmail()
    .withMessage("email is required and must be a valid email address"),
  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("pincode is required and must be 6 digit"),
  body("age").isLength({ min: 1, max: 100 }).withMessage("age is required"),
  body("gender").custom((val) => {
    val = val.toLowerCase();

    if (val === "male" || val === "female" || val === "others") return true;
    else throw new Error("Gender must be required");
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: errors.array() });
    }
    const user = await User.create(req.body);
    return res.status(201).json({ data: user });
  }
);

router.get("/", async function (req, res) {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).json({ data: users });
  } catch (error) {}
});
module.exports = router;
