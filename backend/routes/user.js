const { Router } = require("express");
const router = Router();
const { User , Account } = require("../db");
const zod = require("zod");
const {JWT_SECRET }= require("../config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");

const userSchema = zod.object({
  firstName: zod.string().min(3),
  lastName: zod.string().min(3),
  email: zod.string().email(),
  password: zod.string().min(8), 
});

const userSignInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

const updateSchema = zod.object({
  firstName: zod.string().min(3).optional(),
  lastName: zod.string().min(3).optional(),
  password: zod.string().min(8).optional(),
});

router.post("/signup", async (req, res) => {
  // const {name,email,password} = req.body;

  try {
    const result = userSchema.safeParse(req.body);
    console.log(result);
    if (!result.success) {
      res.status(400).json({
        msg: "input not valid",
      });
    }
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).json({
        msg: "user already exists",
      });
    }
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    user.save();
    const account = new Account({
      balance: Math.floor(Math.random() * 10000), // Random balance between 0 and 9999
      userId: user._id,
    });
    account.save();


    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({ 
      msg: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = userSignInSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        msg: "input not valid",
      });
    }
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      res.status(404).json({
        msg: "user not exist",
      });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "user not exist/ input not valid",
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const { success } = updateSchema.parse(req.body);
    if (!success) {
      res.status(400).json({
        msg: "input not valid",
      });
    }
    await User.updateOne({ _id: req.userId }, req.body);
    res.json({
      msg: "user updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: "input not valid",
    });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  try {
    const users = await User.find({
      $or: [
        {
          firstName: { $regex: filter },
        },
        {
          lastName: { $regex: filter },
        },
      ],
    });
    res.json({
      user: users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({
      msg: "error",
    });
  }
});

module.exports = router;
